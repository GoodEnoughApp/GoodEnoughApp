import React, { useEffect, useState, useContext, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Password.module.css';
import Icon from '../../components/Icon';
import AppContext from '../../AppContext';

const ViewContext = createContext({});

export default function Password() {
  const history = useHistory();
  const { api } = useContext(AppContext);
  const [me, setMe] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  console.log(`Me`, me);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password do not match');
      return;
    }
    api
      .updateMe({ name: me.name, password })
      .then(() => {
        alert('Password updated successfully');
        history.goBack();
      })
      .catch((err) => alert(err.message));
  };
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.replace('/signin');
      return;
    }

    setMe(JSON.parse(localStorage.getItem('me')));
  }, []);

  return (
    <ViewContext.Provider
      value={{
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
      }}
    >
      <form className={styles.page} onSubmit={onSubmit}>
        <Topbar />
        <Content me={me} />
      </form>
    </ViewContext.Provider>
  );
}

function Topbar() {
  const history = useHistory();
  return (
    <header className={styles.topbar}>
      <div>
        <button
          type="button"
          onClick={() => {
            history.goBack();
          }}
        >
          <Icon name="chevron-left" />
        </button>
      </div>
      <div>Change Password</div>
      <div>
        <button type="submit">Save</button>
      </div>
    </header>
  );
}

function Content({ me }) {
  const { password, setPassword, confirmPassword, setConfirmPassword } =
    useContext(ViewContext);
  if (!me) {
    return <section />;
  }

  return (
    <section>
      <div className={styles.group}>
        <div className={`${styles.row} ${styles.info}`}>
          <div>
            {' '}
            <Icon name="lock" />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              minLength={6}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className={`${styles.row} ${styles.info}`}>
          <div>
            {' '}
            <Icon name="lock" />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              minLength={6}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
