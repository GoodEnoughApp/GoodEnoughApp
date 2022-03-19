import React, { useEffect, useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import AppContext from '../AppContext';
import Loading from '../components/Loading';
import styles from './Home.module.css';

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
      console.log(`In here i fetch the remote data`);
      let { products } = await api.getProducts();
      products = products.reduce((acc, product) => {
        const { id } = product;
        acc.set(id, product);
        return acc;
      }, new Map());

      const groupMap = {};
      const { items } = await api.getItems();
      items.forEach((item) => {
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
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.page}>
      <Topbar />
      <Content isLoading={isLoading} groups={groups} />
      <BottomBar />
    </div>
  );
}

function Topbar() {
  return (
    <header className={styles.topbar}>
      <div>
        <img alt="Details" />
      </div>
      <div>Home</div>
      <div>
        <Link to="/new">
          <img alt="Add" />
        </Link>
      </div>
    </header>
  );
}

function BottomBar() {
  return (
    <footer>
      <nav>
        <div>
          <img alt="Home" title="Home" />
          <span>Home</span>
        </div>
        <div>
          <img alt="Shopping List" title="Shopping List" />
          <span>Shopping</span>
        </div>
        <div>
          <img alt="Settings" title="Settings" />
          <span>Settings</span>
        </div>
      </nav>
    </footer>
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
  return (
    <div className={styles.group} id={`group-${id}`}>
      <div className={styles.title}>
        <h4>{title}</h4>
      </div>
      <div className={styles.items}>
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

function Item({ id, title, quantity, cost }) {
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
        <img alt="check" />
      </div>
    </div>
  );
}
