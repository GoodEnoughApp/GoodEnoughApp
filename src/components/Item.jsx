/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Icon from './Icon';
import styles from './Item.module.css';

export function Group({ id, title, isExpired, isSoonToExpired, children }) {
  return (
    <div
      className={[
        styles.group,
        isExpired ? styles.expired : '',
        isSoonToExpired ? styles['expired-soon'] : '',
      ].join(' ')}
      id={`group-${id}`}
    >
      <div className={styles.title}>
        <h4>{title}</h4>
      </div>
      <div className={styles.items}>{children}</div>
    </div>
  );
}

export function Item({
  id,
  title,
  quantity,
  cost,
  onCheckboxClick,
  isLoading,
  onSelect,
  selectedClass,
}) {
  const classNames = [styles.item];
  if (selectedClass) {
    classNames.push(selectedClass);
  }
  return (
    <div id={id} className={classNames.join(' ')}>
      <div className={styles.image}>
        <img alt="product" />
      </div>
      <div onClick={onSelect} role="button" className={styles.content}>
        <div>
          <h5>
            {title} {quantity > 1 ? <em>(x{quantity})</em> : null}
          </h5>
          <small>${parseFloat(`${quantity * cost}`).toFixed(2)}</small>
        </div>
      </div>
      <div className={styles.actions}>
        <button type="button" disabled={isLoading} onClick={onCheckboxClick}>
          <Icon name="check-square" />
        </button>
      </div>
    </div>
  );
}
