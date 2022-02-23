import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SignUp.module.css';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords are different');
    }
  };

  let submitBtn = <button type="submit">Sign Up</button>;
  if (!name || !email || !password || !confirmPassword) {
    submitBtn = (
      <button disabled type="submit">
        Sign Up
      </button>
    );
  }

  return (
    <div className={styles.page}>
      <form onSubmit={onSubmit}>
        <img alt="logo" className={styles.logo} />
        <h2>Let get started</h2>
        <h3>Create a new account</h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          required
          placeholder="Full name"
          title="Full name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="Your Email"
          title="Your Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          placeholder="Password"
          title="Password"
        />
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          required
          placeholder="Confirm Password"
          title="Confirm password"
        />
        {submitBtn}
        <p>
          Have an account? <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
}
