import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { useState } from 'react';
import AppContext from './AppContext';
import styles from './App.module.css';

// Pages
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Settings from './pages/Settings';
import Shopping from './pages/Shopping';
import ShoppingItem from './pages/ShoppingItem';
import ForgetPassword from './pages/ForgetPassword';
import ItemDetails from './pages/ItemDetails';

// TODO: I need to add support for ForgotPassword

import Api from './services/Api';

const host = 'https://good-enough-webapp-staging.herokuapp.com';

function App() {
  const [api, setApi] = useState(new Api(host));
  if (localStorage.getItem('token')) {
    api.setToken(localStorage.getItem('token'));
  }

  return (
    <AppContext.Provider
      value={{
        api,
        setApi,
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
            <Route exact path="/profile" component={Settings} />
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
