import moment from 'moment';

export function notifyExpiredItems({ items, onSelect, productsMap }) {
  const key = 'notified-item';

  if (!window?.Notification || !productsMap) {
    return;
  }

  if (Notification.permission !== 'granted') {
    Notification.requestPermission((status) => {
      if (status === 'granted') {
        notifyExpiredItems({ items, onSelect, productsMap });
      }
    });
    return;
  }

  items = items
    .filter((item) => {
      const { expirationDate } = item;
      return (
        moment(expirationDate).diff(moment(new Date()), 'days') <= 7 &&
        moment(expirationDate).diff(moment(new Date()), 'days') >= 1
      );
    })
    .sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate));

  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, '[]');
  }

  const itemSet = new Set([...JSON.parse(localStorage.getItem(key))]);
  for (const item of items) {
    const { id, productId } = item;
    const product = productsMap.get(productId);
    const title = product.name;
    if (!itemSet.has(id)) {
      const notification = new Notification(`Donate: ${title}`, {
        body: `The item "${title}" is near expire, please donate the item if possible`,
        icon: '/logo512.png',
      });
      notification.onclick = () => {
        onSelect(id);
      };
      itemSet.add(id);
    }
  }
  localStorage.setItem(key, JSON.stringify([...itemSet]));
}
