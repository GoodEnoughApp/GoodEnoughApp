import React, { useEffect, useContext, useState, createContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import AppContext from '../AppContext';
import Icon from '../components/Icon';
import Loading from '../components/Loading';
import BottomBar from '../components/BottomBar';
import styles from './Shopping.module.css';

const ViewContext = createContext({});

export default function Shopping() {
  const history = useHistory();
  const { api } = useContext(AppContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onRemoveItem = ({ id }) => {
    setItems(items.filter((item) => item.id !== id));
  };

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

      const response = await api.getShopping();
      const data = [];
      for (const item of response.items) {
        const product = products.get(item.product_id);
        item.product = product;
        item.title = product.name;
        data.push(item);
      }
      setItems(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <ViewContext.Provider
      value={{
        api,
        items,
        onRemoveItem,
      }}
    >
      <div className={styles.page}>
        <Topbar />
        <Content isLoading={isLoading} />
        <BottomBar selected="shopping" />
      </div>
    </ViewContext.Provider>
  );
}

function Topbar() {
  const { items } = useContext(ViewContext);
  return (
    <header className={styles.topbar}>
      <div />
      <div>Shopping List</div>
      <div>{items.length ? <ShareButton /> : null}</div>
    </header>
  );
}

function ShareButton() {
  const { items } = useContext(ViewContext);
  const values = [
    'Shopping List',
    '------------',
    ...items.map((item) => {
      let content = item.title;
      if (item.quantity > 1) {
        content = `${content} x ${item.quantity}`;
      }

      return `- [ ] ${content}`;
    }),
  ];
  const text = values.join('\n');
  let onClick = () => {};

  if (navigator.clipboard) {
    onClick = () => {
      navigator.clipboard.writeText(text).then(
        () => {
          alert('Shopping list is in the clipboard');
        },
        (err) => {
          alert(err.message);
        },
      );
    };
  }

  if (navigator.share) {
    onClick = () => {
      navigator.share({
        title: 'Shopping List',
        text,
      });
    };
  }
  return (
    <button type="button" onClick={onClick}>
      <Icon name="share" />
    </button>
  );
}

function Content({ isLoading }) {
  const { items } = useContext(ViewContext);
  if (isLoading) {
    return (
      <section>
        <Loading />
      </section>
    );
  }

  if (!items.length) {
    return (
      <section>
        <Empty />
      </section>
    );
  }

  return (
    <section className={styles.items}>
      {items.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </section>
  );
}

function Empty() {
  return (
    <div className={styles.empty}>
      <div className={styles.whale}>
        <Whale />
      </div>
      <small>You don't have products in your shopping list</small>
    </div>
  );
}

function Whale() {
  return (
    <svg
      version="1.1"
      id="whale"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 511.999 511.999"
    >
      <g>
        <g>
          <path
            d="M501.3,197.77c-9.917-12.997-24.979-20.45-41.328-20.45H129.118c6.299-9.858,12.175-22.977,12.175-37.642
          c0-30.94-26.153-55.03-27.265-56.04c-3.889-3.529-9.821-3.529-13.708,0c-1.113,1.011-27.264,25.1-27.264,56.04
          c0,5.917,0.962,11.582,2.517,16.884c-5.303-1.555-10.967-2.517-16.886-2.517c-30.94,0-55.029,26.152-56.04,27.265
          c-3.529,3.889-3.529,9.821,0,13.709c1.011,1.113,25.1,27.265,56.04,27.265c15.869,0,29.924-6.879,39.999-13.731
          c6.237,62.364,39.983,118.871,92.953,154.023c14.605,9.693,30.297,17.476,46.758,23.221c-6.521,17.569-5.832,34.446-5.782,35.471
          c0.254,5.245,4.449,9.439,9.693,9.693c0.201,0.01,1.014,0.044,2.323,0.044c8.46,0,37.639-1.446,56.583-20.391
          c4.025-4.025,7.254-8.512,9.852-13.163c82.073-1.351,155.988-50.452,188.976-125.871c4.04-9.237,7.43-18.823,10.079-28.494
          C514.442,227.299,511.227,210.781,501.3,197.77z M58.684,201.887c-13.424,0-25.765-7.723-33.311-13.705
          c7.573-5.988,19.954-13.737,33.311-13.737c13.421,0,25.76,7.72,33.31,13.706C84.423,194.139,72.041,201.887,58.684,201.887z
           M93.451,139.679c0-13.437,7.735-25.786,13.721-33.329c5.989,7.548,13.722,19.896,13.722,33.329s-7.732,25.78-13.722,33.329
          C101.183,165.46,93.451,153.113,93.451,139.679z M286.788,396.193c-9.499,9.499-23.697,12.762-33.269,13.865
          c1.102-9.573,4.365-23.771,13.866-33.27c9.5-9.5,23.703-12.763,33.269-13.866C299.551,372.494,296.288,386.693,286.788,396.193z
           M318.912,376.729c3.127-13.293,2.685-24.2,2.646-25.018c-0.254-5.244-4.449-9.439-9.693-9.693
          c-1.5-0.074-37.027-1.533-58.906,20.347c-1.682,1.682-3.21,3.45-4.626,5.272c-11.964-3.935-23.498-9.056-34.453-15.302
          c79.464-72.664,170.984-76.668,197.94-76.089c10.906,0.236,19.949,0.346,28.456,0.346h34.696
          C443.991,334.775,384.851,372.797,318.912,376.729z M490.444,237.703c-1.705,6.23-3.753,12.422-6.113,18.49h-44.054
          c-8.357,0-17.26-0.108-28.016-0.341c-29.365-0.633-130.137,3.783-216.067,85.06c-46.354-33.688-74.859-86.141-77.905-143.193
          h341.684c9.933,0,19.085,4.528,25.11,12.425C491.121,218.054,493.074,228.099,490.444,237.703z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M420.767,212.72c-6.467,0-11.729,5.262-11.729,11.729s5.262,11.729,11.729,11.729s11.729-5.262,11.729-11.729
          S427.234,212.72,420.767,212.72z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M263.133,206.025H148.904c-5.632,0-10.199,4.566-10.199,10.199s4.567,10.199,10.199,10.199h114.229
          c5.633,0,10.199-4.566,10.199-10.199S268.765,206.025,263.133,206.025z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M296.79,206.025h-2.04c-5.632,0-10.199,4.566-10.199,10.199s4.567,10.199,10.199,10.199h2.04
          c5.632,0,10.199-4.566,10.199-10.199S302.422,206.025,296.79,206.025z"
          />
        </g>
      </g>
    </svg>
  );
}

function Item({ id, title, quantity, cost }) {
  const { api, onRemoveItem } = useContext(ViewContext);
  const [isLoading, setIsLoading] = useState(false);
  const onClickChecked = async () => {
    if (
      !confirm(
        `Are you sure you want to remove "${title}" from the shopping list?`,
      )
    ) {
      return;
    }
    setIsLoading(true);
    api
      .deleteShoppingItem({ id })
      .then(({ status }) => {
        setIsLoading(false);
        if (status !== 'success') {
          alert('An error happened removing the item');
          return;
        }
        onRemoveItem({ id });
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.message);
      });
  };
  return (
    <div id={id} className={styles.item}>
      <div className={styles.image}>
        <img alt="product" />
      </div>
      <Link to={`/shopping/${id}`} className={styles.content}>
        <div>
          <h5>
            {title} {quantity > 1 ? <em>(x{quantity})</em> : null}
          </h5>
          <small>${parseFloat(`${quantity * cost}`).toFixed(2)}</small>
        </div>
      </Link>
      <div className={styles.actions}>
        <button type="button" disabled={isLoading} onClick={onClickChecked}>
          <Icon name="check-square" />
        </button>
      </div>
    </div>
  );
}
