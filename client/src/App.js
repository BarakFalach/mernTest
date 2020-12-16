import React, { Fragment, useEffect } from "react";
import LoginUser from "./components/auth/LoginUser";
import LoginAdmin from "./components/auth/LoginAdmin";
import Register from "./components/auth/Register";
import Landing from "./components/layouts/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Alert from "./components/layouts/Alert";
import Game from "./components/game/Game";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadAdmin } from "./actions/auth";
import "./App.css";
import setAuthToken from "./utils/setAuthToken";

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
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/loginUser" component={LoginUser} />
              <Route exact path="/loginAdmin" component={LoginAdmin} />
              <Route exact path="/Register" component={Register} />
              <PrivateRoute exact path="/Dashboard" component={Dashboard} />
              <PrivateRoute exact path="/Game" component={Game} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
