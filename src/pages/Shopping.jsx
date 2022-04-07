/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect, createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom';
// import moment from 'moment';

import AppContext from '../AppContext';
import Navbar from '../components/Navbar';
import Icon from '../components/Icon';
import Loading from '../components/Loading';
import UpdateShoppingItem from '../components/UpdateShoppingItem';
import { Empty as Penguin } from '../components/Empty';

import styles from './Base.module.css';

const ViewContext = createContext({});

export default function Shopping() {
  const history = useHistory();
  const [selection, setSelection] = useState(null);
  const { api } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [productsMap, setProductsMap] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);

  const onRemoveItem = ({ id }) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const onUpdateItem = (item) => {
    setItems(
      items.map((i) => {
        if (i.id === item.id) {
          return item;
        }
        return i;
      }),
    );
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.replace('/signin');
    }

    const fetchData = async () => {
      setIsLoading(true);
      let response = await api.getCategories();
      setCategories(response.categories);

      response = await api.getProducts();
      setProducts(response.products);
      const productMap = response.products.reduce((acc, product) => {
        const { id } = product;
        acc.set(id, product);
        return acc;
      }, new Map());
      setProductsMap(productMap);

      response = await api.getShopping();
      const data = [];
      for (const item of response.items) {
        const product = productMap.get(item.productId);
        if (!product) {
          continue;
        }
        item.product = product;
        item.title = product.name;
        data.push(item);
      }
      setItems(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const classNames = [styles.page];

  if (selection) {
    classNames.push(styles.selected);
  }

  return (
    <ViewContext.Provider
      value={{
        api,
        items,
        onUpdateItem,
        onRemoveItem,
        selection,
        setSelection,
        products,
        productsMap,
        categories,
      }}
    >
      <div className={classNames.join(' ')}>
        <Navbar selected="shopping" />
        <Content isLoading={isLoading} />
        <Selection selection={selection} />
      </div>
    </ViewContext.Provider>
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
    <section className={[styles.content, styles['layout-2']].join(' ')}>
      <div className={styles.topbar}>
        <div />
        <div>Shopping List</div>
        <div>{items.length ? <ShareButton /> : null}</div>
      </div>
      <div className={styles.list}>
        {items.map((item) => (
          <ShoppingItem key={item.id} item={item} />
        ))}
      </div>
    </section>
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

function Empty() {
  const history = useHistory();
  const onClick = () => {
    history.push('/new');
  };
  return <Penguin onClick={onClick} />;
}

function Selection({ selection }) {
  const { api } = useContext(AppContext);
  const { setSelection, isLoading, onRemoveItem, onUpdateItem } =
    useContext(ViewContext);
  if (!selection || isLoading) {
    return <Unselect />;
  }

  return (
    <UpdateShoppingItem
      api={api}
      item={selection}
      goBack={() => {
        setSelection(null);
      }}
      onUpdate={(item) => {
        onUpdateItem(item);
        setSelection(null);
      }}
      onDelete={(item) => {
        onRemoveItem(item);
        setSelection(null);
      }}
    />
  );
}

function ShoppingItem({ item }) {
  const { api, setSelection, selection, onRemoveItem } =
    useContext(ViewContext);
  const { id, title, quantity, cost } = item;

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
  const classNames = [styles['shopping-item']];
  if (selection && selection.id === item.id) {
    classNames.push(styles.selected);
  }

  return (
    <div id={id} className={classNames.join(' ')}>
      <div className={styles.image}>
        <img alt="product" />
      </div>
      <div
        role="button"
        onClick={() => {
          setSelection(item);
        }}
        className={styles.content}
      >
        <div>
          <h5>
            {title} {quantity > 1 ? <em>(x{quantity})</em> : null}
          </h5>
          <small>${parseFloat(`${quantity * cost}`).toFixed(2)}</small>
        </div>
      </div>
      <div className={styles.actions}>
        <button type="button" disabled={isLoading} onClick={onClickChecked}>
          <Icon name="check-square" />
        </button>
      </div>
    </div>
  );
}

function Unselect() {
  return (
    <section className={[styles.selection, styles.unselected].join(' ')}>
      Click an option
    </section>
  );
}
