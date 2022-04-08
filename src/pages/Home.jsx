import { useState, useEffect, createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import AppContext from '../AppContext';
import Navbar from '../components/Navbar';
import Icon from '../components/Icon';
import { Group, Item } from '../components/Item';
import Loading from '../components/Loading';
import AddProduct from '../components/AddProduct';
import UpdateProduct from '../components/UpdateProduct';
import { Empty as Penguin } from '../components/Empty';
import { notifyExpiredItems } from '../utils/notification';
import useHome from '../hooks/useHome';

import styles from './Base.module.css';
import { useHealth } from '../hooks/health';

const ViewContext = createContext({});

export default function Home() {
  const history = useHistory();
  const { isOnline } = useHealth();
  const { api } = useContext(AppContext);
  const {
    isLoading,
    categories,
    products,
    items,
    onAddItem,
    onDeleteItem,
    onUpdateItem,
  } = useHome(api);

  const [selection, setSelection] = useState(null);
  const [groups, setGroups] = useState([]);

  const classNames = [styles.page];

  const productsMap = products.reduce((acc, product) => {
    const { id } = product;
    acc.set(id, product);
    return acc;
  }, new Map());

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.replace('/signin');
    }

    if (isLoading) {
      return;
    }

    if (!isOnline && selection === 'add') {
      setSelection(null);
    }

    notifyExpiredItems({
      items,
      productsMap,
      onSelect: (id) => {
        for (const item of items) {
          if (item.id === id) {
            setSelection(item);
            break;
          }
        }
      },
    });
  }, [isLoading, isOnline]);

  useEffect(() => {
    const groupMap = {};
    const now = moment(new Date());
    const expiredItems = [];
    if (!productsMap || !items) {
      return;
    }
    items
      .filter((i) => !i.is_used)
      .forEach((item) => {
        const { expirationDate } = item;
        const expirationMoment = moment(expirationDate);
        const isExpired = expirationMoment.isSameOrBefore(now, 'day');
        const { productId } = item;
        const product = productsMap.get(productId);

        item.product = product;
        item.title = product.name;
        if (isExpired) {
          expiredItems.push(item);
          return;
        }

        if (!groupMap[expirationDate]) {
          groupMap[expirationDate] = [];
        }

        groupMap[expirationDate].push(item);
      });

    const data = [];
    const expirationDates = Object.keys(groupMap).sort(
      (a, b) => new Date(a) - new Date(b),
    );
    if (expiredItems.length) {
      data.push({
        id: 'expired-items',
        title: 'Expired',
        isExpired: true,
        items: expiredItems,
      });
    }
    expirationDates.forEach((expirationDate, i) => {
      const item = {
        id: i,
        title: expirationDate,
        items: groupMap[expirationDate],
      };

      const expirationDateMoment = moment(expirationDate);

      if (expirationDateMoment.diff(now, 'days') <= 7) {
        item.title = expirationDateMoment.fromNow();
        item.isSoonToExpired = true;
      } else {
        item.title = expirationDateMoment.format('MMMM Do YYYY');
      }

      data.push(item);
    });
    setGroups(data);
  }, [items]);

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

  if (selection) {
    classNames.push(styles.selected);
  }

  return (
    <ViewContext.Provider
      value={{
        setItemAsUsed,
        api,
        setSelection,
        categories,
        products,
        isLoading,
        onAddItem,
        onDeleteItem,
        selection,
        onUpdateItem,
        isOnline,
      }}
    >
      <div className={classNames.join(' ')}>
        <Navbar selected="home" />
        <Content isLoading={isLoading} groups={groups} />
        <Selection selection={selection} />
      </div>
    </ViewContext.Provider>
  );
}

function Content({ isLoading, groups }) {
  const { setSelection, isOnline } = useContext(ViewContext);
  if (isLoading) {
    return (
      <section>
        <Loading />
      </section>
    );
  }

  if (!groups.length) {
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
        <div>Home</div>
        <div>
          <button
            disabled={!isOnline}
            type="button"
            onClick={() => {
              setSelection('add');
            }}
          >
            <Icon name="plus" color="#0360ae" />
          </button>
        </div>
      </div>
      <Items groups={groups} />
    </section>
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
  const {
    setSelection,
    categories,
    products,
    isLoading,
    onAddItem,
    onDeleteItem,
    onUpdateItem,
    isOnline,
  } = useContext(ViewContext);
  if (!selection || isLoading) {
    return <Unselect />;
  }

  if (selection === 'add') {
    return (
      <AddProduct
        api={api}
        categories={categories}
        products={products}
        onAdd={onAddItem}
        goBack={() => {
          setSelection(null);
        }}
      />
    );
  }

  return (
    <UpdateProduct
      api={api}
      item={selection}
      isOnline={isOnline}
      goBack={() => {
        setSelection(null);
      }}
      onUpdate={(item) => {
        onUpdateItem(item);
      }}
      onDelete={(item) => {
        onDeleteItem(item);
      }}
    />
  );
}

function Items({ groups }) {
  return (
    <div className={styles.list}>
      {groups.map((group) => {
        const { items } = group;
        return (
          <Group key={group.id} {...group}>
            {items.map((item) => (
              <ProductItem key={item.id} groupId={group.id} item={item} />
            ))}
          </Group>
        );
      })}
    </div>
  );
}

function ProductItem({ item, groupId }) {
  const { id, title, quantity, cost, expirationDate, product } = item;
  const { setItemAsUsed, api, setSelection, selection, isOnline } =
    useContext(ViewContext);
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    const message = `Are you sure you want to set the product "${title}" as used`;
    if (!confirm(message)) {
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
    <Item
      selectedClass={selection?.id === id ? styles['selected-item'] : null}
      onSelect={() => setSelection(item)}
      isLoading={isLoading || !isOnline}
      onCheckboxClick={onClick}
      {...item}
    />
  );
}

function Unselect() {
  return (
    <section className={[styles.selection, styles.unselected].join(' ')}>
      Click an option
    </section>
  );
}
