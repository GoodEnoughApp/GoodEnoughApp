/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { DayPickerRangeController } from 'react-dates';
import { useState, useEffect, createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import moment from 'moment';

import AppContext from '../AppContext';
import Navbar from '../components/Navbar';
import { Empty as Whale } from '../components/Empty';
import { CategoryIcon } from '../components/Icon/Category';
// import Icon from '../components/Icon';
import Loading from '../components/Loading';
import Profile from '../components/Profile';
import { useHealth } from '../hooks/health';
import useReport from '../hooks/useReport';

import styles from './Base.module.css';
import 'react-dates/lib/css/_datepicker.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const ViewContext = createContext({});

export default function Report() {
  const history = useHistory();

  const [startDate, setStartDate] = useState(moment().startOf('week'));
  const [endDate, setEndDate] = useState(moment().endOf('week'));
  const [focusedInput, setFocusedInput] = useState('startDate');
  const { isOnline } = useHealth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { api } = useContext(AppContext);
  const { isLoading, categories, products, items } = useReport(api);
  const classNames = [styles.page];

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.replace('/signin');
    }
  }, [isOnline]);

  const me = JSON.parse(localStorage.getItem('me') || '{}');

  const productsMap = products.reduce((acc, product) => {
    acc[product.id] = product;
    return acc;
  }, {});

  return (
    <ViewContext.Provider
      value={{
        api,
        isOnline,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        focusedInput,
        setFocusedInput,
        isLoading,
        categories,
        products,
        items: items
          .filter((item) => {
            const { endAt } = item;
            if (endAt === null) {
              return false;
            }

            return (
              moment(endAt).isSameOrAfter(startDate) &&
              moment(endAt).isSameOrBefore(endDate)
            );
          })
          .map((item) => {
            item.product = productsMap[item.productId];
            return item;
          }),
      }}
    >
      <div className={classNames.join(' ')}>
        <Navbar
          onProfileClick={() => {
            setIsProfileOpen(true);
          }}
          selected="report"
        />
        <Content isLoading={isLoading} />
        <Selection />
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

  return (
    <section className={[styles.content, styles['layout-2']].join(' ')}>
      <div className={styles.topbar}>
        <div />
        <div>Report</div>
        <div />
      </div>
      <div className={[styles.list, styles.report].join(' ')}>
        <DatePicker />
        {items.length ? (
          <section className={styles['chart-container']}>
            <ReportChart />
          </section>
        ) : null}

        {!items.length ? (
          <div className={[styles.chart, styles.empty].join(' ')}>
            <Empty />
          </div>
        ) : null}
        {items.length ? <Items /> : null}
      </div>
    </section>
  );
}

function DatePicker() {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    focusedInput,
    setFocusedInput,
  } = useContext(ViewContext);
  return (
    <div className={styles['date-range-picker']}>
      <DayPickerRangeController
        startDate={startDate}
        focusedInput={focusedInput}
        endDate={endDate}
        numberOfMonths={1}
        onFocusChange={(change) => {
          if (change === null) {
            setFocusedInput('startDate');
            return;
          }
          setFocusedInput(change);
        }}
        onDatesChange={(response) => {
          setStartDate(response.startDate);
          setEndDate(response.endDate);
        }}
      />
    </div>
  );
}

function Selection() {
  return (
    <section className={[styles.selection, styles.unselected].join(' ')}>
      <ReportChart />
    </section>
  );
}

function ReportChart() {
  const { items, startDate, endDate } = useContext(ViewContext);
  const [data, setData] = useState({
    isExpired: 0,
    isUsed: 0,
  });

  useEffect(() => {
    const response = items.reduce(
      (acc, item) => {
        const { isUsed, isExpired, cost, quantity } = item;
        if (isUsed) {
          acc.isUsed += cost * quantity;
          return acc;
        }

        if (isExpired) {
          acc.isExpired += cost * quantity;
          return acc;
        }
        return acc;
      },
      {
        isExpired: 0,
        isUsed: 0,
      },
    );
    setData(response);
  }, [startDate, endDate, items]);

  if (!items.length) {
    return (
      <div className={[styles.chart, styles.empty].join(' ')}>
        <Empty />
      </div>
    );
  }

  return (
    <div className={styles.chart}>
      <div>
        <Doughnut
          data={{
            labels: ['Expired', 'Used'],
            datasets: [
              {
                data: [data.isExpired, data.isUsed],
                backgroundColor: [
                  'rgba(255, 45, 85, 0.2)',
                  'rgba(6, 176, 219, 0.2)',
                ],
                borderColor: ['rgba(255, 45, 85, 1)', 'rgba(6, 176, 219, 1)'],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

function Items() {
  const { items } = useContext(ViewContext);
  return (
    <div className={[styles.list, styles.items].join(' ')}>
      <div className={styles.header}>Items</div>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
}

function Item({ item }) {
  const { id, quantity, cost, product, isExpired } = item;

  const classNames = [styles.item];

  if (isExpired) {
    classNames.push(styles.expired);
  }

  return (
    <div id={id} className={classNames.join(' ')}>
      <div className={styles.image}>
        <CategoryIcon name={product?.category?.type} />
      </div>
      <div role="button" className={styles.content}>
        <div>
          <h5>
            {product.name} {quantity > 1 ? <em>(x{quantity})</em> : null}
          </h5>
          <small>${parseFloat(`${quantity * cost}`).toFixed(2)}</small>
        </div>
      </div>
      <div className={styles.actions} />
    </div>
  );
}

function Empty() {
  return <Whale type="whale" text="No records were found" />;
}
