import React, { Fragment, useEffect } from "react";
import LoginUser from "./components/auth/LoginUser";
import LoginAdmin from "./components/auth/LoginAdmin";
import Register from "./components/auth/Register";
import Landing from "./components/layouts/Landing";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Alert from "./components/layouts/Alert";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadAdmin } from "./actions/auth";
import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/layouts/Dashboard";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    //Empty [] only run once, else inifinty.
    store.dispatch(loadAdmin());
  }, []);
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
              <Route exact path='/Dashboard' component={Dashboard} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
