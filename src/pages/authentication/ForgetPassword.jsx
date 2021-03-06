import { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';

import styles from './ForgetPassword.module.css';
import AppContext from '../../AppContext';
import { Logo } from '../../components/Logo';

export default function ForgetPassword() {
  const history = useHistory();
  const { api, cursorLocation, dimensions } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const sendRequest = async () => {
      try {
        const { status } = await api.forgot({ email });
        setIsLoading(false);
        if (status === 'success') {
          alert('A temporary password was sent to your email');
          history.replace('/signin');
        } else {
          alert('An error happened please try again');
        }

        setIsLoading(false);
      } catch (err) {
        alert(err.message);
        setIsLoading(false);
      }
    };
    sendRequest();
  };

  let submitBtn = <button type="submit">Submit</button>;
  if (!email) {
    submitBtn = (
      <button disabled type="submit">
        Submit
      </button>
    );
  }

  if (isLoading) {
    submitBtn = (
      <button disabled type="submit">
        Processing
      </button>
    );
  }

  return (
    <div className={styles.page}>
      <form onSubmit={onSubmit}>
        <div className={styles.logo}>
          <Logo dimensions={dimensions} cursorLocation={cursorLocation} />
        </div>
        <h2>Forgot Password?</h2>
        <input
          required
          value={email}
          type="email"
          placeholder="Insert your email"
          title="Insert your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <small>
          <Link to="/signin">I remember my password</Link>
        </small>

        {submitBtn}
      </form>
    </div>
  );
}
