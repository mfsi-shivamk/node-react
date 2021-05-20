import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Upload from './components/Upload/Upload';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import ErrorPage from './components/Error/404';
import requireAuthHoc from './components/Auth/requireAuthHoc';

export default function App() {
  return (
    <Router >
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/logout' component={Logout} />
        <Route exact path='/upload' component={Upload} />
        <Route exact path='/login' component={Login} />
        <Route component={requireAuthHoc(Dashboard)} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  )
}
