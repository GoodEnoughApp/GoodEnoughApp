import { useState, useContext, createContext, useEffect } from 'react';
import moment from 'moment';

import Icon from './Icon';

import styles from './UpdateProduct.module.css';

const ComponentContext = createContext({});

export default function UpdateProduct({
  item,
  api,
  goBack,
  onUpdate,
  onDelete,
  onUsed,
  isOnline,
}) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [cost, setCost] = useState(item.cost);
  const [expirationDate, setExpirationDate] = useState(item.expirationDate);

  useEffect(() => {
    setQuantity(item.quantity);
    setCost(item.cost);
    setExpirationDate(item.expirationDate);
  }, [item]);

  if (!api.token) {
    return <section />;
  }

  return (
    <ComponentContext.Provider
      value={{
        api,
        goBack,
        onUpdate,
        item,
        expirationDate,
        setExpirationDate,
        quantity,
        setQuantity,
        cost,
        setCost,
        onDelete,
        onUsed,
        isOnline,
      }}
    >
      <Options item={item} />
    </ComponentContext.Provider>
  );
}

function Options({ item }) {
  const {
    quantity,
    setQuantity,
    cost,
    setCost,
    expirationDate,
    setExpirationDate,
    goBack,
    api,
    onUpdate,
    isOnline,
  } = useContext(ComponentContext);
  const { id, title, brand, initialQuantity } = item;
  const onSave = async (evt) => {
    evt.preventDefault();
    if (!isOnline) {
      return;
    }

    try {
      const response = await api.updateItem({
        itemId: id,
        expirationDate,
        initialQuantity:
          initialQuantity === 0 ? parseInt(`${quantity}`, 10) : initialQuantity,
        quantity: parseInt(`${quantity}`, 10),
        cost: parseFloat(`${cost}`),
      });

      if (response.status !== 'success') {
        alert('Error updating the item');
        return;
      }
      onUpdate(response.item);
      goBack();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <form
      onSubmit={onSave}
      className={[styles.component, styles['layout-2']].join(' ')}
    >
      <header className={styles.topbar}>
        <div>
          <button type="button" onClick={goBack}>
            <Icon name="chevron-left" />
          </button>
        </div>
        <div>Edit product</div>
        <div>
          {isOnline ? (
            <button type="submit">Save</button>
          ) : (
            <button type="submit" disabled>
              Save
            </button>
          )}
        </div>
      </header>
      <div>
        <div className={styles.options}>
          {title ? (
            <div>
              <span>Name</span>
              <span>{title}</span>
            </div>
          ) : null}
          {brand ? (
            <div>
              <span>Brand</span>
              <span>{brand}</span>
            </div>
          ) : null}

          <div className={styles.separator} />
          <div>
            <label htmlFor="expiration-date">Expiration Date</label>
            <input
              id="expiration-date"
              name="expiration-date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              type="date"
              min={moment().add(1, 'day').format('YYYY-MM-DD')}
              required
            />
          </div>
          <div>
            <label htmlFor="unit-price">Unit price</label>
            <input
              id="unit-price"
              name="unit-price"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              type="number"
              inputMode="decimal"
              pattern="[0-9]+([.][0-9]+)?"
              required
              min={0.01}
              step="0.01"
            />
          </div>
          <div>
            <span>Quantity</span>
            <span>
              <input
                id="quantity"
                name="quantity"
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                min={1}
                pattern="[0-9]*"
                required
              />
            </span>
          </div>
        </div>
        <Actions />
      </div>
    </form>
  );
}

function Actions() {
  const { api, item, goBack, onDelete, isOnline } =
    useContext(ComponentContext);
  const { id } = item;
  const onClickUsed = async () => {
    if (!confirm('Are you sure you want to set the item as used?')) return;
    try {
      await api.updateItem({
        itemId: id,
        isUsed: true,
      });
      item.isExpired = false;
      item.isUsed = true;
      onDelete(item);
    } catch (e) {
      alert(e.message);
      return;
    }

    if (confirm('Do you want to add to the shopping list?')) {
      try {
        await api.addItemToShopping({
          productId: item.product.id,
          quantity: item.quantity,
          cost: item.cost,
        });
      } catch (e) {
        alert(e.message);
        return;
      }
    }

    goBack();
  };
  const onClickIsExpired = async () => {
    if (!confirm('Are you sure you want to set the item as expired?')) return;
    try {
      await api.updateItem({
        itemId: id,
        isExpired: true,
      });
      item.isUsed = false;
      item.isExpired = true;
      onDelete(item);
    } catch (e) {
      alert(e.message);
      return;
    }

    if (confirm('Do you want to add to the shopping list?')) {
      try {
        await api.addItemToShopping({
          productId: item.product.id,
          quantity: item.quantity,
          cost: item.cost,
        });
      } catch (e) {
        alert(e.message);
        return;
      }
    }

    goBack();
  };
  const onClickDelete = () => {
    if (!confirm('Are you sure you want to remove the item?')) return;

    api
      .deleteItem({ id })
      .then(({ status }) => {
        if (status !== 'success') {
          alert('An error happened deleting the item');
          return;
        }
        // onDelete(item);
        goBack();
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className={styles.actions}>
      {moment(item.expirationDate).isAfter(moment(new Date())) ? (
        <button
          type="button"
          className={styles.used}
          disabled={!isOnline}
          onClick={onClickUsed}
        >
          Set Item as Used
        </button>
      ) : null}
      {moment(item.expirationDate).isAfter(moment(new Date())) ? null : (
        <button
          type="button"
          className={styles.expired}
          disabled={!isOnline}
          onClick={onClickIsExpired}
        >
          Set Item as Expired
        </button>
      )}

      <button
        type="button"
        className={styles.delete}
        disabled={!isOnline}
        onClick={onClickDelete}
      >
        Delete Product
      </button>
    </div>
  );
}
