import { useState, useContext, createContext, useEffect } from 'react';

import Icon from './Icon';

import styles from './UpdateShoppingItem.module.css';

const ComponentContext = createContext({});

export default function UpdateShoppingItem({
  api,
  item,
  goBack,
  onUpdate,
  onDelete,
}) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [cost, setCost] = useState(item.cost);

  useEffect(() => {
    setQuantity(item.quantity);
    setCost(item.cost);
  }, [item]);

  if (!api.token) {
    return <section />;
  }

  return (
    <ComponentContext.Provider
      value={{
        api,
        goBack,
        item,
        quantity,
        setQuantity,
        cost,
        setCost,
        onUpdate,
        onDelete,
      }}
    >
      <Options item={item} />
    </ComponentContext.Provider>
  );
}

function Options({ item }) {
  const { quantity, setQuantity, cost, setCost, goBack, onUpdate, api } =
    useContext(ComponentContext);
  const { id, title, brand } = item;
  const onSave = async (e) => {
    e.preventDefault();

    api
      .updateShopping({
        itemId: id,
        quantity: parseInt(`${quantity}`, 10),
        cost: parseFloat(`${cost}`),
      })
      .then(({ status }) => {
        if (status !== 'success') {
          alert('An error happened updating the product');
          return;
        }
        item.quantity = parseInt(`${quantity}`, 10);
        item.cost = parseFloat(`${cost}`);
        onUpdate(item);
        goBack();
      })
      .catch((err) => alert(err.message));
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
        <div>Edit item</div>
        <div>
          <button type="submit">Save</button>
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
        </div>
        <Actions />
      </div>
    </form>
  );
}

function Actions() {
  const { api, item, goBack, onDelete } = useContext(ComponentContext);
  const { id } = item;
  const onClickDelete = () => {
    if (!confirm('Are you sure you want to remove the item?')) return;

    api
      .deleteShoppingItem({ id })
      .then(({ status }) => {
        if (status !== 'success') {
          alert('An error happened deleting the item');
          return;
        }
        onDelete(item);
        goBack();
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className={styles.actions}>
      <button type="button" className={styles.delete} onClick={onClickDelete}>
        Delete Product
      </button>
    </div>
  );
}
