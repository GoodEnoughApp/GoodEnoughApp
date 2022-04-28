import { useHistory } from 'react-router-dom';

import Icon from './Icon';
import styles from './Navbar.module.css';

export default function Navbar({ selected, onProfileClick }) {
  const history = useHistory();
  const selectedColor = '#0360ae';
  const unSelectedColor = '#c4c4c4';
  return (
    <nav className={styles.bar}>
      <div>
        <button
          type="button"
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
          onClick={() => {
            history.replace('/shopping');
          }}
          className={selected === 'shopping' ? styles.selected : null}
        >
          <Icon
            name="shopping-cart"
            color={selected === 'shopping' ? selectedColor : unSelectedColor}
          />
          <span>Shop</span>
        </button>
        <button
          type="button"
          onClick={() => {
            history.replace('/report');
          }}
          className={selected === 'report' ? styles.selected : null}
        >
          <Icon
            name="pie-chart"
            color={selected === 'report' ? selectedColor : unSelectedColor}
          />
          <span>Report</span>
        </button>
        <button
          type="button"
          onClick={() => {
            if (onProfileClick) {
              onProfileClick();
            }
          }}
          className={selected === 'profile' ? styles.selected : null}
        >
          <Icon
            name="user"
            color={selected === 'profile' ? selectedColor : unSelectedColor}
          />
          <span>Profile</span>
        </button>
      </div>
    </nav>
  );
}
