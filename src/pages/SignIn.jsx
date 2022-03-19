import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../AppContext';
import styles from './SignIn.module.css';

export default function SignIn() {
  const history = useHistory();
  const { api, setApi } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    api
      .login({ email, password })
      .then(({ authToken, expiredAt }) => {
        api.setToken(authToken);
        localStorage.setItem('token', authToken);
        localStorage.setItem('expire_at', expiredAt);
        setApi(api);
        history.replace('/');
      })
      .catch((err) => alert(err.message));
  };

  let submitBtn = <button type="submit">Sign In</button>;
  if (!email || !password) {
    submitBtn = (
      <button disabled type="submit">
        Sign In
      </button>
    );
  }

  return (
    <div className={styles.page}>
      <form onSubmit={onSubmit}>
        <img alt="logo" src="/logo512.png" className={styles.logo} />
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
          minLength={8}
          placeholder="Password"
          title="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <small>
          <Link to="/forgot-password">Forgot password</Link>
        </small>
        {submitBtn}
        <p>
          Don&apos;t have an account? <Link to="/signup">Register</Link>
        </p>
      </form>
    </div>
  );
}
