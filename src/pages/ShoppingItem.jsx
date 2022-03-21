import React, { useState, createContext, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Loading from '../components/Loading';
import Icon from '../components/Icon';
import styles from './ShoppingItem.module.css';
import AppContext from '../AppContext';

const ViewContext = createContext({});

export default function ShoppingItem() {
  const history = useHistory();
  const { api } = useContext(AppContext);
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [cost, setCost] = useState(0);

  const onSubmit = (e) => {
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
        history.replace('/shopping');
      })
      .catch((err) => alert(err.message));
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await api.getShoppingItem({ id });
        const { product } = await api.getProduct({
          id: response.item.product_id,
        });
        response.item.title = product.name;
        response.item.brand = product.brand;
        response.item.product = product;
        setItem(response.item);
        setQuantity(response.item.quantity);
        setCost(response.item.cost);
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
        api,
        id,
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
      <div>Edit item</div>
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
  const { quantity, setQuantity, cost, setCost } = useContext(ViewContext);
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
        <span>Quantity</span>
        <span>
          <input
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
        <span>Unit price</span>
        <span>
          <input
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            type="number"
            inputMode="decimal"
            pattern="[0-9]+([.][0-9]+)?"
            required
            min={0.01}
            step="0.01"
          />
        </span>
      </div>
    </div>
  );
}

function Actions() {
  const history = useHistory();
  const { id, api } = useContext(ViewContext);
  const onClick = () => {
    if (!confirm('Are you sure you want to remove the item?')) return;

    api
      .deleteShoppingItem({ id })
      .then(({ status }) => {
        if (status !== 'success') {
          alert('An error happened deleting the item');
          return;
        }
        history.replace('/shopping');
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className={styles.actions}>
      <button onClick={onClick} className={styles.delete} type="button">
        Delete Item
      </button>
    </div>
  );
}
