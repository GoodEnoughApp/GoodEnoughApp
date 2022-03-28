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
import AddProduct from './pages/AddProduct';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Shopping from './pages/Shopping';
import ShoppingItem from './pages/ShoppingItem';
import ForgetPassword from './pages/ForgetPassword';
import ItemDetails from './pages/ItemDetails';
import Password from './pages/profile/Password';

// TODO: I need to add support for ForgotPassword

import Api from './services/Api';

const host = 'https://good-enough-webapp-staging.herokuapp.com';

function App() {
  const [dimensions, setDimensions] = useState(null);
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

  return (
    <AppContext.Provider
      value={{
        api,
        setApi,
        cursorLocation,
        dimensions,
      }}
    >
      <main className={styles.app}>
        <Router>
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/forget-password" component={ForgetPassword} />
            <Route exact path="/new" component={AddProduct} />
            <Route exact path="/shopping" component={Shopping} />
            <Route exact path="/shopping/:id" component={ShoppingItem} />
            <Route exact path="/profile/password" component={Password} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/items/:id" component={ItemDetails} />
            <Route exact path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </main>
    </AppContext.Provider>
  );
}

export default App;
