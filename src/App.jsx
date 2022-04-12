import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { useEffect, useState } from 'react';
import AppContext from './AppContext';
import styles from './App.module.css';

// Pages
import Home from './pages/Home';
import Shopping from './pages/Shopping';
import SignIn from './pages/authentication/SignIn';
import SignUp from './pages/authentication/SignUp';
import ForgetPassword from './pages/authentication/ForgetPassword';

import Api from './services/Api';

const host = 'https://good-enough-webapp-staging.herokuapp.com';

function getDeviceType(width) {
  if (width >= 481 && width <= 768) {
    return 'tablet';
  }
  if (width >= 769) {
    return 'desktop';
  }
  return 'mobile';
}

function App() {
  const [dimensions, setDimensions] = useState(null);
  const [device, setDevice] = useState(null);
  const [cursorLocation, setCursorLocation] = useState(null);
  const [api, setApi] = useState(new Api(host));
  if (localStorage.getItem('token')) {
    api.setToken(localStorage.getItem('token'));
  }

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    window.addEventListener('resize', () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
    window.addEventListener('mousemove', (e) => {
      const { pageX, pageY, clientX, clientY } = e;
      setCursorLocation({
        pageX,
        pageY,
        clientX,
        clientY,
      });
    });
  }, []);

  useEffect(() => {
    if (!dimensions?.width) {
      return;
    }
    setDevice(getDeviceType(dimensions?.width));
  }, [dimensions?.width]);

  return (
    <AppContext.Provider
      value={{
        api,
        setApi,
        cursorLocation,
        dimensions,
        device,
      }}
    >
      <main className={styles.app}>
        <Router>
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/forget-password" component={ForgetPassword} />
            <Route exact path="/shopping" component={Shopping} />
            <Route exact path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </main>
    </AppContext.Provider>
  );
}

export default App;
