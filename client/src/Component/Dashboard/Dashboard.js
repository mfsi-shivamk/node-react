import React from 'react';
import Home from './Home'; 
import Movie from '../Movie/Movie'; 
import Checkout from '../EyeTest/Checkout'; 
import Eye from '../EyeTest/Eye'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function MiniDrawer(props) {

  return (
    <Router >
      <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/movie' component={Movie} />
      <Route exact path='/eye' component={Checkout} />
      <Route exact path='/eye-test' component={Eye} />
      </Switch>
    </Router>
  );
}