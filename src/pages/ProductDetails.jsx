import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductDetails.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <Topbar />
      <Content />
    </div>
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
      <div>Save</div>
    </header>
  );
}

function Content() {
  return (
    <section>
      <Options />
      <Actions />
    </section>
  );
}

function Options() {
  return (
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
  );
}

function Actions() {
  return (
    <div className={styles.actions}>
      <button type="button">Set Item as Used</button>
      <button type="button">Delete Product</button>
    </div>
  );
}
