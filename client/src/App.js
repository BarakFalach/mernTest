import React, { Fragment, useEffect } from 'react';
import LoginUser from './components/auth/LoginUser';
import LoginAdmin from './components/auth/LoginAdmin';
import Register from './components/auth/Register';
import Landing from './components/layouts/Landing';
import PrivateRoute from './components/routing/PrivateRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Alert from './components/layouts/Alert';
import ControlPanel from './components/dashboard/ControlPanel';
import Game from './components/game/Game';
import { Provider } from 'react-redux';
import store from './store';
import { loadAdmin } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Route exact path='/' component={Landing} />
					<section className='container'>
						<Alert />
						<Switch>
							<Route exact path='/loginUser' component={LoginUser} />
							<Route exact path='/loginAdmin' component={LoginAdmin} />
							<Route exact path='/Register' component={Register} />
							<PrivateRoute
								exact
								path='/ControlPanel'
								component={ControlPanel}
							/>
							<Route exact path='/game' component={Game} />
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};
export default App;
