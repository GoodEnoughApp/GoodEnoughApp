/* eslint-disable lines-between-class-members */
// eslint-disable-next-line max-classes-per-file
import PouchDB from 'pouchdb-browser';

const config = {
  auto_compaction: true,
};

export class Store {
  constructor(name) {
    this.store = new PouchDB(name, config);
  }

  add = async (item) =>
    new Promise((resolve, reject) => {
      item = { ...item, _id: `${item.id}` };

      this.store
        .put(item)
        .then(() => {
          // item.rev = result.rev;
          resolve(item);
        })
        .catch(reject);
    });

  save = async (item) => {
    if (Array.isArray(item)) {
      return this.bulk(item);
    }

    return new Promise((resolve, reject) => {
      item = { ...item, _id: `${item.id}` };

      this.store
        .get(`${item.id}`)
        .then((i) => {
          if (i) {
            const { _rev } = i;
            item = { ...item, _rev };
          }

          return this.store.put(item);
        })

        .then((result) => {
          item.rev = result.rev;
          resolve(item);
        })
        .catch(reject);
    });
  };

  get = async (id = null) => {
    if (id === null) {
      const { rows } = await this.store.allDocs({ include_docs: true });
      return rows.map((row) => row.doc);
    }

    if (typeof id !== 'string') {
      id = `${id}`;
    }

    try {
      const item = await this.store.get(id);
      return item;
    } catch (e) {
      if (e.name === 'not_found') {
        return null;
      }

      throw new Error(e);
    }
  };

  remove = async (id = null) => {
    if (id === null) {
      let items = await this.get();
      items = items.map((item) => ({ ...item, _deleted: true }));
      await this.store.bulkDocs(items);
      return null;
    }

    if (typeof id !== 'string') {
      id = `${id}`;
    }
    const item = await this.get(id);
    if (!item) {
      return null;
    }

    await this.store.remove(item);
    return null;
  };

  bulk = async (items) => {
    const savedItems = await this.get();
    const itemMap = new Map();
    for (const item of savedItems) {
      itemMap.set(`${item.id}`, item);
    }

    items = items.map((item) => {
      item = { ...item, _id: `${item.id}` };
      const cachedItem = itemMap.get(`${item.id}`);
      if (cachedItem) {
        const { _rev } = cachedItem;
        item = { ...item, _rev };
      }
      return item;
    });
    const replies = await this.store.bulkDocs(items);
    const replyMap = new Map();
    for (const reply of replies) {
      const { id, rev } = reply;
      replyMap.set(id, rev);
    }

    return items.map((item) => {
      const { id } = item;
      item = { ...item, _id: id };
      if (replyMap.get(`${id}`)) {
        item = { ...item, _rev: replyMap.get(`${id}`) };
      }
      return item;
    });
  };
}

export default class Db {
  constructor() {
    this.categories = new Store('category');
    this.items = new Store('item');
    this.products = new Store('product');
    this.shopping = new Store('shopping');
  }
}
