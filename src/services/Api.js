import { post, get, put } from 'axios';

export default class Api {
  constructor(host) {
    this.host = host;
  }

  setToken = (token) => {
    this.token = token;
  };

  signIn = async ({ name, email, password }) => {
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
    const url = `${this.host}/verify`;
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
}
