import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BottomBar from '../components/BottomBar';
import styles from './Settings.module.css';

export default function Settings() {
  const history = useHistory();
  const [me, setMe] = useState(null);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.replace('/signin');
      return;
    }

    setMe(JSON.parse(localStorage.getItem('me')));
  }, []);

  return (
    <div className={styles.page}>
      <Topbar />
      <Content me={me} />
      <BottomBar selected="settings" />
    </div>
  );
}

function Topbar() {
  return (
    <header className={styles.topbar}>
      <div />
      <div>Settings</div>
      <div />
    </header>
  );
}

function Content({ me }) {
  const history = useHistory();
  const onClickLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      history.replace('/signin');
    }
  };

  if (!me) {
    return <section />;
  }

  const { email, name } = me;

  return (
    <section>
      <div className={styles.group}>
        <div className={`${styles.row} ${styles.info}`}>
          <div>Name</div>
          <div>{name}</div>
        </div>
        <div className={`${styles.row} ${styles.info}`}>
          <div>Email</div>
          <div>{email}</div>
        </div>
      </div>
      <div className={`${styles.group} ${styles.logout}`}>
        <div className={styles.row}>
          <button type="button" onClick={onClickLogout}>
            Log out
          </button>
        </div>
      </div>
    </section>
  );
}
