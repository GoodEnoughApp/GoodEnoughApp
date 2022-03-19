import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import styles from './AddProduct.module.css';
import Barcode from '../components/Barcode';
import Loading from '../components/Loading';
import Icon from '../components/Icon';
import AppContext from '../AppContext';

const ViewContext = createContext({});

export default function AddProduct() {
  const { api } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [barcode, setBarcode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!barcode) {
      setIsScanning(true);
    }
  }, []);

  useEffect(() => {
    if (!barcode) return;
    if (!api.token) return;
    setIsScanning(false);
    setIsLoading(true);
    // alert(`Barcode: ${barcode}`);
    async function processBarcode() {
      try {
        let response = await api.getCategories();
        setCategories(response.categories);

        response = await api.upsertProduct({ barcode });

        // Create custom product
        if (response.productId === null) {
          setProduct({
            barcode,
            isCustom: true,
          });
          setIsLoading(false);
          return;
        }

        // The product is created but i need to get the information
        if (typeof response.productId === 'string') {
          response = await api.getProduct({ id: response.productId });
          setProduct(response.product);
          setIsLoading(false);
          return;
        }

        setProduct(response.product);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        alert(e.message);
      }
    }

    processBarcode();
  }, [barcode, api]);

  if (!api.token) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    );
  }

  return (
    <ViewContext.Provider
      value={{
        isScanning,
        setIsScanning,
        setBarcode,
        product,
        categories,
        setProduct,
      }}
    >
      {isScanning ? <Scanning /> : <Details />}
    </ViewContext.Provider>
  );
}

function Scanning() {
  const history = useHistory();
  const { setBarcode } = useContext(ViewContext);
  return (
    <div className={styles.scanning}>
      <Barcode
        onCancel={() => {
          history.goBack();
        }}
        onFound={({ barcode }) => {
          setBarcode(barcode);
        }}
      />
    </div>
  );
}

function Details() {
  const { product } = useContext(ViewContext);
  if (!product) return null;
  if (product.isCustom) {
    return <CustomProduct product={product} />;
  }

  return <Product product={product} />;
}

function CustomProduct() {
  const history = useHistory();
  const { api } = useContext(AppContext);
  const { product, categories } = useContext(ViewContext);
  const { barcode } = product;
  const [name, setName] = useState('');
  const [alias, setAlias] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0].id);

  const [cost, setCost] = useState(0);
  const [expirationDate, setExpirationDate] = useState('');
  const [quantity, setQuantity] = useState(0);

  const onSave = async (e) => {
    e.preventDefault();
    const { productId, status } = await api.upsertCustomProduct({
      barcode,
      name,
      alias,
      description,
      brand,
      manufacturer,
      categoryId,
    });

    if (status !== 'success') {
      alert('An error happened creating the product');
      return;
    }

    const response = await api.addItem({
      productId,
      expirationDate,
      quantity: parseInt(`${quantity}`, 10),
      cost: parseFloat(`${cost}`),
    });

    if (response.status === 'success') {
      history.replace('/');
      return;
    }

    alert('An error happened creating an item of the custom product');
  };
  return (
    <form onSubmit={onSave} className={styles.page}>
      <Topbar />
      <section>
        <div className={styles.options}>
          <div>
            <span>Barcode</span>
            <span>{barcode}</span>
          </div>
          <div>
            <label htmlFor="product-name">Name</label>
            <input
              id="product-name"
              name="product-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
            />
          </div>
          <div>
            <label htmlFor="product-alias">Alias</label>
            <input
              id="product-alias"
              name="product-alias"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              type="text"
              required
            />
          </div>
          <div>
            <label htmlFor="product-description">Description</label>
            <textarea
              id="product-description"
              name="product-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              required
            />
          </div>
          <div>
            <label htmlFor="product-brand">Brand</label>
            <input
              id="product-brand"
              name="product-brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              type="text"
              required
            />
          </div>
          <div>
            <label htmlFor="product-manufacturer">Manufacturer</label>
            <input
              id="product-manufacturer"
              name="product-manufacturer"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              type="text"
              required
            />
          </div>
          {categories.length > 1 ? (
            <div>
              <label htmlFor="product-category">Category</label>
              <select
                name="product-category"
                id="product-category"
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                }}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          <div className={styles.separator} />
          <div>
            <label htmlFor="expiration-date">Expiration Date</label>
            <input
              id="expiration-date"
              name="expiration-date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              type="date"
              min={moment().add(1, 'day').format('YYYY-MM-DD')}
              required
            />
          </div>
          <div>
            <span>Unit Price</span>
            <span>
              <input
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                type="number"
                inputMode="decimal"
                pattern="[0-9]+([.][0-9]+)?"
                required
                min={0.01}
                step="0.01"
              />
            </span>
          </div>
          <div>
            <span>Quantity</span>
            <span>
              <input
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                min={1}
                pattern="[0-9]*"
                required
              />
            </span>
          </div>
        </div>
      </section>
    </form>
  );
}

function Product({ product }) {
  const history = useHistory();
  const { api } = useContext(AppContext);
  const [cost, setCost] = useState(0);
  const [expirationDate, setExpirationDate] = useState('');
  const [quantity, setQuantity] = useState(0);
  const {
    id,
    name,
    barcode,
    alias,
    brand,
    manufacturer,
    description,
    category,
  } = product;

  const onSave = async (evt) => {
    evt.preventDefault();
    try {
      const { status } = await api.addItem({
        productId: id,
        expirationDate,
        quantity: parseInt(`${quantity}`, 10),
        cost: parseFloat(`${cost}`),
      });
      if (status === 'success') {
        history.replace('/');
        return;
      }

      alert('An error happened creating the product');
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <form onSubmit={onSave} className={styles.page}>
      <Topbar />
      <section>
        <div className={styles.options}>
          <div>
            <span>Barcode</span>
            <span>{barcode}</span>
          </div>
          {name ? (
            <div>
              <span>Name</span>
              <span>{name}</span>
            </div>
          ) : null}

          {description ? (
            <div>
              <span>Description</span>
              <span>{description}</span>
            </div>
          ) : null}

          {alias ? (
            <div>
              <span>Alias</span>
              <span>{alias}</span>
            </div>
          ) : null}
          {brand ? (
            <div>
              <span>Brand</span>
              <span>{brand}</span>
            </div>
          ) : null}
          {manufacturer ? (
            <div>
              <span>Manufacturer</span>
              <span>{manufacturer}</span>
            </div>
          ) : null}
          {category?.name ? (
            <div>
              <span>Category</span>
              <span>{category?.name}</span>
            </div>
          ) : null}
          <div className={styles.separator} />
          <div>
            <label htmlFor="expiration-date">Expiration Date</label>
            <input
              id="expiration-date"
              name="expiration-date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              type="date"
              min={moment().add(1, 'day').format('YYYY-MM-DD')}
              required
            />
          </div>
          <div>
            <span>Unit Price</span>
            <span>
              <input
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                type="number"
                inputMode="decimal"
                pattern="[0-9]+([.][0-9]+)?"
                required
                min={0.01}
                step="0.01"
              />
            </span>
          </div>
          <div>
            <span>Quantity</span>
            <span>
              <input
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                min={1}
                pattern="[0-9]*"
                required
              />
            </span>
          </div>
        </div>
      </section>
    </form>
  );
}

function Topbar() {
  const history = useHistory();
  return (
    <header className={styles.topbar}>
      <div>
        <button
          type="button"
          onClick={() => {
            history.goBack();
          }}
        >
          <Icon name="chevron-left" />
        </button>
      </div>
      <div>Add product</div>
      <div>
        <button type="submit">Save</button>
      </div>
    </header>
  );
}
