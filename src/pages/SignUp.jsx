import { Link } from 'react-router-dom';
import styles from './SignUp.module.css';

export default function SignUp() {
  return (
    <div className={styles.page}>
      <form>
        <img alt="logo" className={styles.logo} />
        <h2>Let get started</h2>
        <h3>Create a new account</h3>
        <input type="text" placeholder="Full name" title="Full name" />
        <input type="email" placeholder="Email" title="Email" />
        <input type="password" placeholder="Password" title="Password" />
        <small>
          <Link to="/forgot-password">Forgot password</Link>
        </small>
        <button type="submit">Sign In</button>
        <p>
          Have an account? <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
}
