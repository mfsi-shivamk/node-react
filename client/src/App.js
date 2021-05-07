import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Component/Auth/Login';
import Logout from './Component/Auth/Logout';
import Register from './Component/Auth/Register';
import Dashboard from './Component/Dashboard/Dashboard';
import ErrorPage from './Component/Error/404';
import requireAuth from './Component/Auth/requireAuth';
import './App.css';

export default function App() {
  return (
    <Router >
    <Switch>
      <Route exact path='/register' component={Register} />
      <Route exact path='/logout' component={Logout} />
      <Route exact path='/login' component={Login} />
      <Route component={requireAuth(Dashboard)} />
      <Route component={ErrorPage} />
    </Switch>
  </Router>
  )

}
