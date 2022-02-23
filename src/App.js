import { AppContext } from './AppContext';
import styles from './App.module.css';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';

// Pages
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
	return (
		<AppContext.Provider
			value={{
				api: null,
			}}
		>
			<main className={styles['app']}>
				<Router>
					<Switch>
						<Route exact path="/signup" component={SignUp} />
						<Route exact path="/signin" component={SignIn} />
						<Route exact path="/" component={Home} />
						<Redirect to="/" />
					</Switch>
				</Router>
			</main>
		</AppContext.Provider>
	);
}

export default App;
