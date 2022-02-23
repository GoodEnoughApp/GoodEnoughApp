import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SignIn.module.css';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styles.page}>
      <form onSubmit={onSubmit}>
        <img alt="logo" className={styles.logo} />
        <h2>Welcome to GoodEnough</h2>
        <input
          required
          value={email}
          type="email"
          placeholder="Email"
          title="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          value={password}
          type="password"
          placeholder="Password"
          title="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <small>
          <Link to="/forgot-password">Forgot password</Link>
        </small>
        <button type="submit">Sign In</button>
        <p>
          Don&apos;t have an account? <Link to="/signup">Register</Link>
        </p>
      </form>
    </div>
  );
}
