import { useEffect, useState } from 'react';

export function useHealth() {
  const [isOnline, setIsOnline] = useState(window?.navigator?.onLine);
  useEffect(() => {
    window.addEventListener('offline', () => {
      console.log('The network connection has been lost.');
      setIsOnline(false);
    });
    window.addEventListener('online', () => {
      console.log('The network connection has been lost.');
      setIsOnline(true);
    });
  });
  return { isOnline };
}
