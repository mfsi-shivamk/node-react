import Cookies from 'universal-cookie';
import React, { Component } from 'react'
import axios from './axios';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Component/Auth/Login';
import Logout from './Component/Auth/Logout';
import Register from './Component/Auth/Register';
import Dashboard from './Component/Dashboard/Dashboard';
import ErrorPage from './Component/Error/404';
const cookies = new Cookies();
export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       user:null
    }
  }
  componentDidMount() {
    axios.get('/api/v1/auth/token', {
      headers: { 'XSRF-token': cookies.get('XSRF-token') || null }
    })
    .then(r=> {console.log(r);
      if(r && r.errors && r.errors.status)
      this.setState({user: r.data})
    })
    .catch(err => {
      cookies.remove('XSRF-token');
    });
  }
  render() {
    const { user } = this.props;
    return (
      <Router >
      {/* <Header user={user} /> */}
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/logout' component={Logout} />
        <Route exact path='/login' component={Login} />
        {(cookies.get('XSRF-token') && cookies.get('XSRF-token').length)? null : <Redirect to="/login"> </Redirect>}
        <Route render={(props) => <Dashboard user={this.state.user} />} exact path='/' />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
    )
  }
}

export default App
