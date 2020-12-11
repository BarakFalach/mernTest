import React, { Fragment } from "react";
import LoginUser from "./components/auth/LoginUser";
import LoginAdmin from "./components/auth/LoginAdmin";
import Register from "./components/auth/Register";
import Landing from "./components/layouts/landing";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => (
  <Router>
    <Fragment>
      <Route exact path='/' component={Register} />
      <Switch>
        <Route exact path='/loginUser' component={LoginUser} />
        <Route exact path='/loginAdmin' component={LoginAdmin} />
        <Route exact path='/Register' component={Register} />
        {/* <Route exact path="/admin" component={AdminLanding}/>         */}
      </Switch>
    </Fragment>
  </Router>
);

export default App;
