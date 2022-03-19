import React, { useEffect, useContext, useState, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../AppContext';
import Icon from '../components/Icon';
import Loading from '../components/Loading';
import BottomBar from '../components/BottomBar';
import styles from './Home.module.css';

const ViewContext = createContext({});

export default function Home() {
  const history = useHistory();
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { api } = useContext(AppContext);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.replace('/signin');
    }

    const fetchData = async () => {
      setIsLoading(true);
      let { products } = await api.getProducts();
      products = products.reduce((acc, product) => {
        const { id } = product;
        acc.set(id, product);
        return acc;
      }, new Map());

      const groupMap = {};
      const { items } = await api.getItems();
      items
        .filter((i) => !i.is_used)
        .forEach((item) => {
          const expirationDate = item.expiration_date;
          const productId = item.product_id;
          if (!groupMap[expirationDate]) {
            groupMap[expirationDate] = [];
          }

          const product = products.get(productId);

          item.product = product;
          item.title = product.name;

          groupMap[expirationDate].push(item);
        });

      const data = [];
      const expirationDates = Object.keys(groupMap).sort(
        (a, b) => new Date(a) - new Date(b),
      );
      expirationDates.forEach((expirationDate, i) =>
        data.push({
          id: i,
          title: expirationDate,
          items: groupMap[expirationDate],
        }),
      );
      setGroups(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const setItemAsUsed = ({ id, groupId }) => {
    setGroups(
      [...groups].map((group) => {
        if (group.id === groupId) {
          group.items = group.items.filter((i) => i.id !== id);
        }
        return group;
      }),
    );
  };

  return (
    <ViewContext.Provider
      value={{
        setItemAsUsed,
        api,
      }}
    >
      <div className={styles.page}>
        <Topbar />
        <Content isLoading={isLoading} groups={groups} />
        <BottomBar selected="home" />
      </div>
    </ViewContext.Provider>
  );
}

function Topbar() {
  const history = useHistory();
  return (
    <header className={styles.topbar}>
      <div />
      <div>Home</div>
      <div>
        <button
          type="button"
          onClick={() => {
            history.push('/new');
          }}
        >
          <Icon name="plus" />
        </button>
      </div>
    </header>
  );
}

function Content({ isLoading, groups }) {
  if (isLoading) {
    return (
      <section>
        <Loading />
      </section>
    );
  }
  return (
    <section>
      {groups.map((group) => (
        <Group key={group.id} {...group} />
      ))}
    </section>
  );
}

function Group({ id, title, items }) {
  if (!items.length) return null;
  return (
    <div className={styles.group} id={`group-${id}`}>
      <div className={styles.title}>
        <h4>{title}</h4>
      </div>
      <div className={styles.items}>
        {items.map((item) => (
          <Item
            key={item.id}
            groupId={id}
            expirationDate={item.expiration_date}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

function Item({ id, title, quantity, cost, groupId, expirationDate, product }) {
  const { setItemAsUsed, api } = useContext(ViewContext);
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    if (
      !confirm(`Are you sure you want to set the product "${title}" as used`)
    ) {
      return;
    }
    setIsLoading(true);
    try {
      await api.updateItem({
        itemId: id,
        expirationDate,
        initialQuantity: quantity,
        quantity,
        cost,
        isUsed: true,
      });
      await api.addItemToShopping({
        productId: product.id,
        quantity,
        cost,
      });
      alert('Product was added to the shopping list');
      setItemAsUsed({ id, groupId });
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  };
  return (
    <div id={id} className={styles.item}>
      <div className={styles.image}>
        <img alt="product" />
      </div>
      <div className={styles.content}>
        <div>
          <h5>
            {title} {quantity > 1 ? <em>(x{quantity})</em> : null}
          </h5>
          <small>${parseFloat(`${quantity * cost}`).toFixed(2)}</small>
        </div>
      </div>
      <div className={styles.actions}>
        <button type="button" disabled={isLoading} onClick={onClick}>
          <Icon name="check-square" />
        </button>
      </div>
    </div>
  );
}
