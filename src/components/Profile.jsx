import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import styles from './Profile.module.css';

export default function Profile({
  isOpen,
  onSend,
  onLogout,
  me,
  api,
  isOnline,
}) {
  const dialogElement = useRef();
  const [view, setView] = useState(null);
  useEffect(() => {
    const { current } = dialogElement;
    if (isOpen) {
      current.showModal();
    }
  }, [isOpen]);
  if (!isOpen) {
    return null;
  }
  const onChangePassword = (e) => {
    console.log(e.target);
    e.preventDefault();

    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    console.log(`Data`);
    console.log({ password, confirmPassword });
    api
      .updateMe({ name: me.name, password })
      .then(() => {
        alert('Password updated successfully');
        setView(null);
      })
      .catch((err) => alert(err.message));
  };
  return (
    <dialog
      className={styles.main}
      onSubmit={view === 'change-password' ? onChangePassword : onSend}
      ref={dialogElement}
    >
      {view === 'change-password' ? (
        <ChangePassword
          isOnline={isOnline}
          goBack={() => {
            setView(null);
          }}
        />
      ) : (
        <Default
          onLogout={onLogout}
          onChangePasswordClick={() => {
            setView('change-password');
          }}
          me={me}
        />
      )}
    </dialog>
  );
}

function Default({ onLogout, me, onChangePasswordClick }) {
  return (
    <form method="dialog">
      <header>
        <div>
          <button type="submit">
            <Icon name="x" />
          </button>
        </div>
        <div>Profile</div>
        <div />
      </header>
      <section>
        <div className={styles.group}>
          <div className={`${styles.row} ${styles.info}`}>
            <div>Name</div>
            <div>{me?.name}</div>
          </div>
          <div className={`${styles.row} ${styles.info}`}>
            <div>Email</div>
            <div>{me?.email}</div>
          </div>
        </div>
        <div className={`${styles.group} ${styles.password}`}>
          <div className={styles.row}>
            <button type="button" onClick={onChangePasswordClick}>
              Change Password
            </button>
          </div>
        </div>
        <div className={`${styles.group} ${styles.logout}`}>
          <div className={styles.row}>
            <button type="button" onClick={onLogout}>
              Log out
            </button>
          </div>
        </div>
      </section>
    </form>
  );
}

function ChangePassword({ goBack, isOnline }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <form>
      <header>
        <div>
          <button type="button" onClick={goBack}>
            <Icon name="chevron-left" />
          </button>
        </div>
        <div>Change Password</div>
        <div>
          {password.length > 6 &&
          confirmPassword.length > 6 &&
          isOnline &&
          password === confirmPassword ? (
            <button type="submit">Save</button>
          ) : (
            <button type="submit" disabled>
              Save
            </button>
          )}
        </div>
      </header>
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
                name="password"
                autoComplete="new-password"
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
                name="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                minLength={6}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}
