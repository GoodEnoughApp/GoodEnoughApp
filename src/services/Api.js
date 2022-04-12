import axios, { post, get, put } from 'axios';

export default class Api {
  constructor(host) {
    this.host = host;
  }

  setToken = (token) => {
    this.token = token;
  };

  health = async () => {
    const url = `${this.host}/categories`;
    try {
      await get(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  signUp = async ({ name, email, password }) => {
    const url = `${this.host}/register`;
    try {
      const { data } = await post(url, {
        name,
        email,
        password,
      });
      return data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response?.data.message);
      }
      throw new Error(e.message);
    }
  };

  verify = async ({ email, verificationCode }) => {
    const url = `${this.host}/register/verify`;
    try {
      const { data } = await post(url, {
        email,
        verificationCode,
      });
      return data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response?.data.message);
      }
      throw new Error(e.message);
    }
  };

  login = async ({ email, password }) => {
    const url = `${this.host}/login`;
    try {
      const { data } = await post(url, {
        email,
        password,
      });
      return data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response?.data.message);
      }
      throw new Error(e.message);
    }
  };

  me = async () => {
    const url = `${this.host}/me`;
    try {
      const { data } = await get(url, {
        headers: {
          authorization: `Bearer ${this.token}`,
        },
      });
      return data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response?.data.message);
      }
      throw new Error(e.message);
    }
  };

  updateMe = async ({ name, password }) => {
    const url = `${this.host}/me`;
    try {
      const { data } = await put(
        url,
        {
          name,
          password,
        },
        {
          headers: {
            authorization: `Bearer ${this.token}`,
          },
        },
      );
      return data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response?.data.message);
      }
      throw new Error(e.message);
    }
  };

  forgot = async ({ email }) => {
    const url = `${this.host}/forgot`;
    try {
      const { data } = await post(url, {
        email,
      });
      return data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response?.data.message);
      }
      throw new Error(e.message);
    }
  };

  getCategories = async () => {
    const url = `${this.host}/categories`;
    try {
      const { data } = await get(url, {
        headers: {
          authorization: `Bearer ${this.token}`,
        },
      });
      return data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response?.data.message);
      }
      throw new Error(e.message);
    }
  };

  upsertProduct = async ({ barcode }) => {
    const url = `${this.host}/products`;

    try {
      const { data } = await put(
        url,
        {
          barcode,
        },
        {
          headers: {
            authorization: `Bearer ${this.token}`,
          },
        },
      );
      return data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response?.data.message);
      }
      throw new Error(e.message);
    }
  };

  getProducts = async () => {
    const url = `${this.host}/products`;
    try {
      const { data } = await get(url, {
        headers: {
          authorization: `Bearer ${this.token}`,
        },
      });
      return data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response?.data.message);
      }
      throw new Error(e.message);
    }
  };

  upsertCustomProduct = async ({
    barcode,
    name,
    alias,
    description,
    brand,
    manufacturer,
    categoryId,
  }) => {
    const url = `${this.host}/products/custom`;
    try {
      const { data } = await put(
        url,
        {
          barcode,
          name,
          alias,
          description,
          brand,
          manufacturer,
          categoryId,
        },
        {
          headers: {
            authorization: `Bearer ${this.token}`,
          },
        },
      );
      return data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response?.data.message);
      }
      throw new Error(e.message);
    }
  };

  addItem = async ({ productId, expirationDate, quantity, cost }) => {
    const url = `${this.host}/products/${productId}`;
    try {
      const { data } = await post(
        url,
        {
          expirationDate,
          quantity,
          cost,
        },
        {
          headers: {
            authorization: `Bearer ${this.token}`,
          },
        },
      );
      return data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response?.data.message);
      }
      throw new Error(e.message);
    }
  };

  updateProduct = async ({
    productId,
    barcode,
    name,
    alias,
    description,
    brand,
    manufacturer,
    categoryId,
  }) => {
    const url = `${this.host}/products/${productId}`;
    try {
      const { data } = await put(
        url,
        {
          barcode,
          name,
          alias,
          description,
          brand,
          manufacturer,
          categoryId,
        },
        {
          headers: {
            authorization: `Bearer ${this.token}`,
          },
        },
      );
      return data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response?.data.message);
      }
      throw new Error(e.message);
    }
  };

  getProduct = async ({ id }) => {
    const url = `${this.host}/products/${id}`;
    try {
      const { data } = await get(url, {
        headers: {
          authorization: `Bearer ${this.token}`,
        },
      });
      return data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response?.data.message);
      }
      throw new Error(e.message);
    }
  };

  deleteProduct = async ({ id }) => {
    const url = `${this.host}/products/${id}`;
    try {
      const { data } = await axios.delete(url, {
        headers: {
          authorization: `Bearer ${this.token}`,
        },
      });
      return data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response?.data.message);
      }
      throw new Error(e.message);
    }
  };

  getItems = async () => {
    const url = `${this.host}/items`;
    try {
      const { data } = await get(url, {
        headers: {
          authorization: `Bearer ${this.token}`,
        },
      });
      return data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response?.data.message);
      }
      throw new Error(e.message);
    }
  };

  updateItem = async ({
    itemId,
    expirationDate,
    initialQuantity,
    quantity,
    cost,
    isUsed,
  }) => {
    const url = `${this.host}/items/${itemId}`;
    try {
      const { data } = await put(
        url,
        {
          expirationDate,
          initialQuantity,
          quantity,
          cost,
          isUsed,
        },
        {
          headers: {
            authorization: `Bearer ${this.token}`,
          },
        },
      );
      return data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response?.data.message);
      }
      throw new Error(e.message);
    }
  };

  getItem = async ({ id }) => {
    const url = `${this.host}/items/${id}`;
    try {
      const { data } = await get(url, {
        headers: {
          authorization: `Bearer ${this.token}`,
        },
      });
      return data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response?.data.message);
      }
      throw new Error(e.message);
    }
  };

  deleteItem = async ({ id }) => {
    const url = `${this.host}/items/${id}`;
    try {
      const { data } = await axios.delete(url, {
        headers: {
          authorization: `Bearer ${this.token}`,
        },
      });
      return data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response?.data.message);
      }
      throw new Error(e.message);
    }
  };

  addItemToShopping = async ({ productId, quantity, cost }) => {
    const url = `${this.host}/shopping`;
    try {
      const { data } = await post(
        url,
        {
          productId,
          quantity,
          cost,
        },
        {
          headers: {
            authorization: `Bearer ${this.token}`,
          },
        },
      );
      return data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response?.data.message);
      }
      throw new Error(e.message);
    }
  };

  getShopping = async () => {
    const url = `${this.host}/shopping`;
    try {
      const { data } = await get(url, {
        headers: {
          authorization: `Bearer ${this.token}`,
        },
      });
      return data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response?.data.message);
      }
      throw new Error(e.message);
    }
  };

  updateShopping = async ({ itemId, quantity, cost }) => {
    const url = `${this.host}/shopping/${itemId}`;
    try {
      const { data } = await put(
        url,
        {
          quantity,
          cost,
        },
        {
          headers: {
            authorization: `Bearer ${this.token}`,
          },
        },
      );
      return data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response?.data.message);
      }
      throw new Error(e.message);
    }
  };

  getShoppingItem = async ({ id }) => {
    const url = `${this.host}/shopping/${id}`;
    try {
      const { data } = await get(url, {
        headers: {
          authorization: `Bearer ${this.token}`,
        },
      });
      return data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response?.data.message);
      }
      throw new Error(e.message);
    }
  };

  deleteShoppingItem = async ({ id }) => {
    const url = `${this.host}/shopping/${id}`;
    try {
      const { data } = await axios.delete(url, {
        headers: {
          authorization: `Bearer ${this.token}`,
        },
      });
      return data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response?.data.message);
      }
      throw new Error(e.message);
    }
  };
}
