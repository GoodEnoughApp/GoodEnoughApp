import { useHistory } from 'react-router-dom';

import Icon from './Icon';
import styles from './BottomBar.module.css';

export default function BottomBar({ selected }) {
  const history = useHistory();
  const selectedColor = '#012c63';
  const unSelectedColor = '#c4c4c4';
  return (
    <footer className={styles.bar}>
      <nav>
        <button
          type="button"
          disabled={selected === 'home'}
          onClick={() => {
            history.replace('/');
          }}
          className={selected === 'home' ? styles.selected : null}
        >
          <Icon
            name="home"
            color={selected === 'home' ? selectedColor : unSelectedColor}
          />
          <span>Home</span>
        </button>
        <button
          type="button"
          disabled={selected === 'shopping'}
          onClick={() => {
            history.replace('/shopping');
          }}
          className={selected === 'shopping' ? styles.selected : null}
        >
          <Icon
            name="shopping-cart"
            color={selected === 'shopping' ? selectedColor : unSelectedColor}
          />
          <span>Shopping</span>
        </button>
        <button
          type="button"
          disabled={selected === 'settings'}
          onClick={() => {
            history.replace('/settings');
          }}
          className={selected === 'settings' ? styles.selected : null}
        >
          <Icon
            name="settings"
            color={selected === 'settings' ? selectedColor : unSelectedColor}
          />
          <span>Settings</span>
        </button>
      </nav>
    </footer>
  );
}
