import React, { useState, createContext, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import Loading from '../components/Loading';
import styles from './ItemDetails.module.css';
import Icon from '../components/Icon';
import AppContext from '../AppContext';

const ViewContext = createContext({});

export default function ItemDetails() {
  const history = useHistory();
  const { api } = useContext(AppContext);
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [cost, setCost] = useState(0);
  const [expirationDate, setExpirationDate] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!item) return;
    try {
      const { status } = await api.updateItem({
        itemId: id,
        expirationDate,
        initialQuantity: item.initial_quantity,
        quantity: parseInt(`${quantity}`, 10),
        cost: parseFloat(`${cost}`),
        isUsed: false,
      });
      if (status !== 'success') {
        alert('Error updating the item');
        return;
      }
      history.goBack();
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.getItem({ id });
        const { product } = await api.getProduct({
          id: response.item.product_id,
        });
        response.item.title = product.name;
        response.item.brand = product.brand;
        response.item.product = product;
        console.log(`Item`);
        console.log(response.item);
        setItem(response.item);
        setQuantity(response.item.quantity);
        setCost(response.item.cost);
        setExpirationDate(response.item.expiration_date);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        alert(e.message);
      }
    };

    fetchData();
  }, [id]);

  return (
    <ViewContext.Provider
      value={{
        id,
        api,
        item,
        expirationDate,
        setExpirationDate,
        quantity,
        setQuantity,
        cost,
        setCost,
      }}
    >
      <form className={styles.page} onSubmit={onSubmit}>
        <Topbar isLoading={isLoading} />
        <Content item={item} isLoading={isLoading} />
      </form>
    </ViewContext.Provider>
  );
}

function Topbar({ isLoading }) {
  const history = useHistory();
  return (
    <header className={styles.topbar}>
      <div>
        <button
          type="button"
          onClick={() => {
            history.goBack();
          }}
        >
          <Icon name="chevron-left" />
        </button>
      </div>
      <div>Edit Item</div>
      <div>
        <button disabled={isLoading} type="submit">
          Save
        </button>
      </div>
    </header>
  );
}

function Content({ item, isLoading }) {
  if (isLoading) {
    return (
      <section>
        <Loading />
      </section>
    );
  }
  return (
    <section>
      {item ? <Options item={item} /> : null}
      <Actions />
    </section>
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
  } = useContext(ViewContext);
  const { id, title, brand } = item;
  return (
    <div id={id} className={styles.options}>
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
  );
}

function Actions() {
  const history = useHistory();

  const { id, api, item } = useContext(ViewContext);
  const onClickUsed = async () => {
    if (!confirm('Are you sure you want to set the item as used?')) return;
    try {
      await api.updateItem({
        itemId: id,
        expirationDate: item.expiration_date,
        initialQuantity: item.initial_quantity,
        quantity: item.quantity,
        cost: item.cost,
        isUsed: true,
      });
    } catch (e) {
      alert(e.message);
      return;
    }

    if (!confirm('Do you want to add to the shopping list?')) return;

    try {
      await api.addItemToShopping({
        productId: item.product.id,
        quantity: item.quantity,
        cost: item.cost,
      });
    } catch (e) {
      alert(e.message);
    }
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
        history.goBack();
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className={styles.actions}>
      <button type="button" className={styles.used} onClick={onClickUsed}>
        Set Item as Used
      </button>
      <button type="button" className={styles.delete} onClick={onClickDelete}>
        Delete Product
      </button>
    </div>
  );
}
