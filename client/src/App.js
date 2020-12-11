import React, { Fragment } from "react";
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
import "./App.css";

const App = () => (
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
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
);
export default App;
