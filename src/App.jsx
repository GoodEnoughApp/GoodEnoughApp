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
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgetPassword from './pages/ForgetPassword';
import ProductDetails from './pages/ProductDetails';

import Api from './services/Api';

const host = 'https://good-enough-webapp-staging.herokuapp.com';

function App() {
  const [api, setApi] = useState(new Api(host));
  useEffect(() => {
    if (localStorage.getItem('token')) {
      api.setToken(localStorage.getItem('token'));
      setApi(api);
    }
  }, []);
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
            <Route exact path="/forget" component={ForgetPassword} />
            <Route exact path="/products/:id" component={ProductDetails} />
            <Route exact path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </main>
    </AppContext.Provider>
  );
}

export default App;
