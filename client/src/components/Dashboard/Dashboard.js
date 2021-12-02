import React from 'react';
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Models from '../Models/Models';
import Model from '../Models/Model';
import Setting from '../Setting/Setting';

export default function Dashboard({ user, rest }) {
  return (
    <Router >
      <Switch>
        <Route exact path='/' render={() => <Home user={user} {...rest}/> } />
        <Route exact path='/models'   render={() => <Models user={user} {...rest}/> } />
        <Route exact path='/predict'   render={() => <Model user={user} {...rest}/> } />
        <Route exact path='/setting' render={() => <Setting user={user} {...rest}/> } />
      </Switch>
    </Router>
  );
}
Dashboard.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  rest:PropTypes.any
}