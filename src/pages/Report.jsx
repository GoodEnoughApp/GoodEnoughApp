/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { DayPickerRangeController } from 'react-dates';
import { useState, useEffect, createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import moment from 'moment';

import AppContext from '../AppContext';
import Navbar from '../components/Navbar';
// import Icon from '../components/Icon';
import Loading from '../components/Loading';
import Profile from '../components/Profile';
import { useHealth } from '../hooks/health';

import styles from './Base.module.css';
import 'react-dates/lib/css/_datepicker.css';

const ViewContext = createContext({});

export default function Shopping() {
  const history = useHistory();
  const [startDate, setStartDate] = useState(moment().startOf('week'));
  const [endDate, setEndDate] = useState(moment().endOf('week'));
  const [focusedInput, setFocusedInput] = useState('startDate');
  const { isOnline } = useHealth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const isLoading = false;
  const { api } = useContext(AppContext);
  const classNames = [styles.page];

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.replace('/signin');
    }
  }, [isOnline]);

  const me = JSON.parse(localStorage.getItem('me') || '{}');

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
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    focusedInput,
    setFocusedInput,
  } = useContext(ViewContext);
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
      </div>
    </section>
  );
}

function Selection() {
  return <Unselect />;
}

function Unselect() {
  return (
    <section className={[styles.selection, styles.unselected].join(' ')}>
      Click an option
    </section>
  );
}
