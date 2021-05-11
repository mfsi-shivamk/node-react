import React from 'react';
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Movie from '../Movie/Movie';
import Setting from '../Setting/Setting';

export default function Dashboard({ user }) {
  return (
    <Router >
      <Switch>
        <Route exact path='/' render={() => <Home user={user} /> } />
        <Route exact path='/movie'   render={() => <Movie user={user} /> } />
        <Route exact path='/setting' render={() => <Setting user={user} /> } />
      </Switch>
    </Router>
  );
}
Dashboard.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired
}