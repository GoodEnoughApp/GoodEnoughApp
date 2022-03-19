import React, { createContext, useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';

import styles from './AddProduct.module.css';
import Barcode from '../components/Barcode';
import AppContext from '../AppContext';

const ViewContext = createContext({});

export default function AddProduct() {
  const { api } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [barcode, setBarcode] = useState('14100048534');

  useEffect(() => {
    if (!barcode) {
      setIsScanning(true);
    }
  }, []);

  useEffect(() => {
    if (!barcode) return;
    if (!api.token) return;
    setIsScanning(false);
    // alert(`Barcode: ${barcode}`);
    async function processBarcode() {
      try {
        let response = await api.upsertProduct({ barcode });

        // Create custom product
        if (response.productId === null) {
          setProduct({
            barcode,
            isCustom: true,
          });
          return;
        }

        // The product is created but i need to get the information
        if (typeof response.productId === 'string') {
          response = await api.getProduct({ id: response.productId });
          setProduct(response.product);
          return;
        }

        setProduct(response.product);
      } catch (e) {
        alert(e.message);
      }
    }

    processBarcode();
  }, [barcode, api]);

  console.log(`Api token: ${api?.token}`);

  if (!api.token) {
    return null;
  }

  return (
    <ViewContext.Provider
      value={{
        isScanning,
        setIsScanning,
        setBarcode,
        product,
        setProduct,
      }}
    >
      {isScanning ? <Scanning /> : <Details />}
    </ViewContext.Provider>
  );
}

function Scanning() {
  const { setBarcode } = useContext(ViewContext);
  return (
    <div className={styles.scanning}>
      <Barcode
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
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className={styles.page}
    >
      <Topbar />
      <section>
        <div className={styles.options}>
          <div>
            <span>Name</span>
            <span>Random Name</span>
          </div>
          <div>
            <span>Brand</span>
            <span>Random Name</span>
          </div>
          <div>
            <span>Expiration Date</span>
            <span>
              <input type="date" />
            </span>
          </div>
          <div>
            <span>Unit Price</span>
            <span>
              <input type="number" />
            </span>
          </div>
          <div>
            <span>Quantity</span>
            <span>
              <input type="number" />
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
      console.log(`I send this to add an item`);
      console.log({
        productId: id,
        quantity,
        expirationDate,
        cost,
      });
      const { status } = await api.addItem({
        productId: id,
        expirationDate,
        quantity: parseInt(`${quantity}`, 10),
        cost: parseFloat(`${cost}`),
      });
      if (status === 'success') {
        alert('I add the item');
      }

      history.replace('/');
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
  return (
    <header className={styles.topbar}>
      <div>
        <Link to="/">
          <img alt="Back" />
        </Link>
      </div>
      <div>Add product</div>
      <div>
        <button type="submit">Save</button>
      </div>
    </header>
  );
}
