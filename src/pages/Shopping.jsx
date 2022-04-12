import { useState, useEffect, createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom';
// import moment from 'moment';

import AppContext from '../AppContext';
import Navbar from '../components/Navbar';
import Icon from '../components/Icon';
import Loading from '../components/Loading';
import UpdateShoppingItem from '../components/UpdateShoppingItem';
import { Empty as Whale } from '../components/Empty';
import { useHealth } from '../hooks/health';
import useShopping from '../hooks/useShopping';
import Profile from './profile/Profile';

import styles from './Base.module.css';

const ViewContext = createContext({});

export default function Shopping() {
  const history = useHistory();
  const { isOnline } = useHealth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { api } = useContext(AppContext);
  const { isLoading, categories, products, items, onRemoveItem, onUpdateItem } =
    useShopping(api);
  const [selection, setSelection] = useState(null);
  const classNames = [styles.page];

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.replace('/signin');
    }
  }, [isLoading, isOnline]);

  if (selection) {
    classNames.push(styles.selected);
  }

  const me = JSON.parse(localStorage.getItem('me') || '{}');

  return (
    <ViewContext.Provider
      value={{
        api,
        items,
        isOnline,
        onUpdateItem,
        onRemoveItem,
        selection,
        setSelection,
        products,
        categories,
      }}
    >
      <div className={classNames.join(' ')}>
        <Navbar
          onProfileClick={() => {
            setIsProfileOpen(true);
          }}
          selected="shopping"
        />
        <Content isLoading={isLoading} />
        <Selection selection={selection} />
        <Profile
          me={me}
          api={api}
          isOnline={isOnline}
          isOpen={isProfileOpen}
          onLogout={() => {
            if (confirm('Are you sure you want to logout?')) {
              localStorage.clear();
              setIsProfileOpen(false);
              history.replace('/signin');
            }
          }}
          onSend={() => {
            setIsProfileOpen(false);
          }}
        />
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
  return <Whale type="whale" />;
}

function Selection({ selection }) {
  const { api } = useContext(AppContext);
  const { setSelection, isLoading, onRemoveItem, onUpdateItem, isOnline } =
    useContext(ViewContext);
  if (!selection || isLoading) {
    return <Unselect />;
  }

  return (
    <UpdateShoppingItem
      api={api}
      item={selection}
      isOnline={isOnline}
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
  const { api, setSelection, selection, onRemoveItem, isOnline } =
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
        <button
          type="button"
          disabled={isLoading || !isOnline}
          onClick={onClickChecked}
        >
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
