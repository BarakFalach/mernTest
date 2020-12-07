import React, {Fragment} from 'react'
import LoginUser from './components/auth/LoginUser';
import LoginAdmin from './components/auth/LoginAdmin';

import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import managerIcon from './assets/managar2.png';
import playerIcon from './assets/player.png';


  const App = () => (
    <Router>
      <Fragment>  
        <section className="container">
          <Switch>
            <Route exact path="/loginUser" component={LoginUser}/>
            <Route exact path="/loginAdmin" component={LoginAdmin}/>            
          </Switch>                   
        </section>
      </Fragment>
    </Router>
     
  );


export default App;
