import { useEffect, useRef } from 'react';
import Icon from '../../components/Icon';
import styles from './Profile.module.css';

export default function Profile({ isOpen, onSend, onLogout, me }) {
  const dialogElement = useRef();
  useEffect(() => {
    const { current } = dialogElement;
    if (isOpen) {
      current.showModal();
    }
  }, [isOpen]);
  if (!isOpen) {
    return null;
  }
  return (
    <dialog className={styles.main} onSubmit={onSend} ref={dialogElement}>
      <Default onLogout={onLogout} me={me} />
    </dialog>
  );
}

function Default({ onLogout, me }) {
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
            <button type="button">Change Password</button>
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
