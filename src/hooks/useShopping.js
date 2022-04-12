import { useEffect, useState } from 'react';
import Db from '../services/Db';
import { useHealth } from './health';

async function fetchRemoteHomeData(api) {
  const { categories } = await api.getCategories();
  const { products } = await api.getProducts();
  const { items } = await api.getShopping();

  return {
    categories,
    products,
    items,
  };
}

async function fetchCachedShoppingData() {
  const db = new Db();

  const categories = await db.categories.get();
  const products = await db.products.get();
  const items = await db.shopping.get();

  return {
    categories,
    products,
    items,
  };
}

export default function useShopping(api) {
  const db = new Db();
  const { isOnline } = useHealth();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);

  const productsMap = products.reduce((acc, product) => {
    const { id } = product;
    acc.set(id, product);
    return acc;
  }, new Map());

  const onRemoveItem = (item) => {
    setItems(items.filter((i) => i.id !== item.id));
    db.shopping
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
    db.shopping
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
          await db.shopping.remove();
          await db.shopping.save(result.items);
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
    fetchCachedShoppingData()
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
    items: items.map((item) => {
      const { productId } = item;
      const product = productsMap.get(productId);

      item.product = product;
      item.title = product.name;
      return item;
    }),
    error,
    onRemoveItem,
    onUpdateItem,
  };
}
