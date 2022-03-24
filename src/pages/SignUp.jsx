import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../AppContext';
import styles from './SignUp.module.css';

export default function SignUp() {
  const history = useHistory();
  const [mode, setMode] = useState('');
  const { api } = useContext(AppContext);
  const [verificationEmail, setVerificationEmail] = useState(null);
  return (
    <div className={styles.page}>
      {mode ? (
        <Verification
          email={verificationEmail}
          onSuccess={() => {
            history.replace('/signin');
          }}
        />
      ) : (
        <Registration
          onSend={({ name, email, password }) => {
            api
              .signUp({ name, email, password })
              .then(() => {
                setVerificationEmail(email);
                setMode('verification');
              })
              .catch((err) => alert(err.message));
          }}
        />
      )}
    </div>
  );
}

function Registration({ onSend }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords are different');
      return;
    }
    onSend({ name, email, password });
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
    <form onSubmit={onSubmit}>
      <img alt="logo" src="/logo512.png" className={styles.logo} />
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
  );
}

function Verification({ email, onSuccess }) {
  const { api } = useContext(AppContext);
  const [verificationCode, setVerificationCode] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    api
      .verify({ email, verificationCode })
      .then(onSuccess)
      .catch((err) => {
        alert(err.message);
      });
  };

  let submitBtn = <button type="submit">Next</button>;
  if (verificationCode.length !== 6) {
    submitBtn = (
      <button disabled type="submit">
        Next
      </button>
    );
  }

  return (
    <form onSubmit={onSubmit} className={styles.verification}>
      <img alt="logo" src="/logo512.png" className={styles.logo} />
      <h2>Whats the verification code</h2>
      <input
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        type="number"
        pattern="[0-9]*"
        minLength={6}
        required
        placeholder="Insert verification code"
        title="Insert verification code"
      />
      {submitBtn}
    </form>
  );
}
