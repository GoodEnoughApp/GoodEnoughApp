import { useEffect, useState } from 'react';
import Db from '../services/Db';
import { useHealth } from './health';

async function fetchRemoteHomeData(api) {
  const { categories } = await api.getCategories();
  const { products } = await api.getProducts();
  let { items } = await api.getItems();
  items = items.filter((i) => !i.isUsed);

  return {
    categories,
    products,
    items,
  };
}

async function fetchCachedHomeData() {
  const db = new Db();

  const categories = await db.categories.get();
  const products = await db.products.get();
  const items = await db.items.get();

  return {
    categories,
    products,
    items,
  };
}

export default function useHome(api) {
  const db = new Db();
  const { isOnline } = useHealth();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);

  const onAddItem = (item) => {
    setItems([...items, item]);

    db.items
      .save(item)
      .then(() => {
        console.debug('Add item to the database', item);
      })
      .catch(console.error);
  };

  const onDeleteItem = (item) => {
    setItems(items.filter((i) => i.id !== item.id));
    db.items
      .remove(item.id)
      .then(() => {
        console.debug('Remove item to the database', item);
      })
      .catch(console.error);
  };

  const onUpdateItem = (item) => {
    setItems(
      items.map((i) => {
        if (i.id === item.id) {
          return item;
        }
        return i;
      }),
    );
    db.items
      .save(item)
      .then(() => {
        console.debug('Update item to the database', item);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (api === null) {
      return;
    }
    if (isOnline) {
      fetchRemoteHomeData(api)
        .then(async (result) => {
          // Categories
          setCategories(result.categories);
          await db.categories.remove();
          await db.categories.save(result.categories);

          // Products
          setProducts(result.products);
          await db.products.remove();
          await db.products.save(result.products);

          // Items
          await db.items.remove();
          await db.items.save(result.items);
          setItems(result.items);

          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
          setError(e);
        });
      return;
    }

    // I'm not online so i fetch from the cache
    fetchCachedHomeData()
      .then((result) => {
        console.log(`I called from the cached`);
        console.log(result);
        setCategories(result.categories);
        setProducts(result.products);
        setItems(result.items);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e);
      });
  }, [isOnline, api]);

  return {
    isLoading,
    categories,
    products,
    items,
    error,
    onAddItem,
    onDeleteItem,
    onUpdateItem,
  };
}
