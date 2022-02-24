import { useState } from 'react';
import styles from './ForgetPassword.module.css';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    alert('A temporary password was sent to your email');
    window.location = '/signin';
  };

  let submitBtn = <button type="submit">Sign In</button>;
  if (!email) {
    submitBtn = (
      <button disabled type="submit">
        Sign In
      </button>
    );
  }

  return (
    <div className={styles.page}>
      <form onSubmit={onSubmit}>
        <img alt="logo" className={styles.logo} />
        <h2>Forgot Password?</h2>
        <input
          required
          value={email}
          type="email"
          placeholder="Insert your email"
          title="Insert your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {submitBtn}
      </form>
    </div>
  );
}
