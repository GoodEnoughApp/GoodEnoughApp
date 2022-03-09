import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext';
import styles from './Home.module.css';

export default function Home() {
  const { api } = useContext(AppContext);
  if (!api.token) {
    return null;
  }
  return (
    <div className={styles.page}>
      <Topbar />
      <Content />
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
        <img alt="Add" />
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

function Content() {
  const { api } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      console.log(`Token: "${api.token}"`);
      try {
        setIsLoading(true);
        const categories = await api.getCategories();
        console.log(categories);
        const items = await api.getItems();
        console.log(items);
        const products = await api.getProducts();

        console.log({
          categories,
          products,
          items,
        });
        setIsLoading(false);
      } catch (err) {
        alert(err.message);
      }
    }
    getData();
  }, []);
  if (isLoading) return <Loading />;

  return <section>{new Array(10).fill(<Group />)}</section>;
}

function Loading() {
  return <div>Loading</div>;
}

function Group() {
  return (
    <div className={styles.group}>
      <div className={styles.title}>
        <h4>Title</h4>
      </div>
      <div className={styles.items}>
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <img alt="product" />
      </div>
      <div className={styles.content}>
        <div>
          <h5>
            Title <em>(x5)</em>
          </h5>
          <small>$0.99</small>
        </div>
      </div>
      <div className={styles.actions}>
        <img alt="check" />
      </div>
    </div>
  );
}
