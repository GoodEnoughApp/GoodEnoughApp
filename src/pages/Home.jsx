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
        <Content
          isLoading={isLoading}
          groups={groups.filter((g) => !!g.items.length)}
        />
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

  if (!groups.length) {
    return (
      <section>
        <Empty />
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

function Empty() {
  return (
    <div className={styles.empty}>
      <div className={styles.penguin}>
        <Penguin />
      </div>
      <small>You don't have products you should add some</small>
    </div>
  );
}

function Penguin() {
  return (
    <svg
      version="1.1"
      id="penguin-image"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
    >
      <g>
        <g>
          <path
            className={styles.body}
            d="M406.245,442.314l-15.551-314.123C387.136,56.308,327.97,0,256,0S124.863,56.308,121.306,128.191l-15.551,314.123
        c-1.265,25.544,11.879,49.093,34.302,61.458c0.001,0.001,0.003,0.002,0.004,0.003c9.758,5.381,20.829,8.225,32.015,8.225h0.674
        H256h83.25h0.674c11.187,0,22.258-2.845,32.015-8.225c0.001-0.001,0.003-0.002,0.004-0.003
        C394.366,491.406,407.509,467.858,406.245,442.314z M245.8,491.602h-62.852v-3.06c0-6.749,5.49-12.239,12.239-12.239h38.373
        c6.749,0,12.239,5.49,12.239,12.239V491.602z M329.051,491.602h-62.853v-3.06c0-6.749,5.49-12.239,12.239-12.239h38.375
        c6.749,0,12.239,5.49,12.239,12.239V491.602z M349.449,490.592v-2.05c0-17.997-14.641-32.637-32.637-32.637h-38.373
        c-8.686,0-16.584,3.418-22.438,8.97c-5.853-5.552-13.752-8.97-22.438-8.97h-38.375c-17.997,0-32.637,14.641-32.637,32.637v2.051
        c-2.398-0.507-4.756-1.192-7.039-2.073l6.316-127.595c2.489-50.258,43.855-89.626,94.173-89.626s91.685,39.369,94.172,89.625
        l6.316,127.595C354.205,489.4,351.847,490.085,349.449,490.592z M376.192,473.964l-5.646-114.049
        C367.519,298.786,317.205,250.9,256,250.9S144.48,298.786,141.453,359.916l-5.646,114.049
        c-6.703-8.532-10.241-19.304-9.679-30.641l15.551-314.124c3.02-61.009,53.236-108.8,114.321-108.8S367.3,68.19,370.32,129.199
        l15.551,314.123C386.432,454.661,382.895,465.432,376.192,473.964z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            className={styles.mouth}
            d="M256,120.351c-18.277,0-33.147,14.87-33.147,33.147c0,15.178,19.367,39.664,25.303,46.806
        c1.938,2.332,4.812,3.68,7.844,3.68c3.032,0,5.906-1.348,7.844-3.68c5.936-7.143,25.303-31.627,25.303-46.806
        C289.147,135.221,274.277,120.351,256,120.351z M256.006,177.079c-7.271-10.182-12.755-20.064-12.755-23.581
        c0-7.03,5.719-12.749,12.749-12.749c7.03,0,12.749,5.719,12.749,12.749C268.749,157.076,263.338,166.844,256.006,177.079z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            className={styles.eye}
            d="M207.553,80.574c-6.749,0-12.239,5.49-12.239,12.239c0,6.749,5.49,12.239,12.239,12.239
        c6.749,0,12.239-5.49,12.239-12.239C219.792,86.064,214.302,80.574,207.553,80.574z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            className={styles.eye}
            d="M304.446,80.574c-6.749,0-12.239,5.49-12.239,12.239c0,6.749,5.49,12.239,12.239,12.239s12.239-5.49,12.239-12.239
        C316.685,86.064,311.195,80.574,304.446,80.574z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            className={styles.body}
            d="M265.29,284.052c-3.063-0.341-6.188-0.514-9.29-0.514c-5.633,0-10.199,4.566-10.199,10.199s4.566,10.199,10.199,10.199
        c2.35,0,4.716,0.131,7.03,0.389c0.383,0.043,0.765,0.064,1.142,0.064c5.126,0,9.542-3.856,10.124-9.07
        C274.92,289.721,270.888,284.676,265.29,284.052z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            className={styles.body}
            d="M296.688,294.147c-4.912-2.755-11.129-1.008-13.885,3.904c-2.756,4.913-1.008,11.129,3.904,13.885
        c19.004,10.662,30.992,30.006,32.068,51.745c0.27,5.455,4.777,9.694,10.178,9.694c0.17,0,0.341-0.004,0.513-0.012
        c5.626-0.278,9.961-5.065,9.682-10.691C337.724,333.881,321.851,308.264,296.688,294.147z"
          />
        </g>
      </g>
    </svg>
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
