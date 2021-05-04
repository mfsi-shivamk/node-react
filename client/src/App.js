import Cookies from 'universal-cookie';
import React, { Component, useEffect } from 'react'
import axios from './axios';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Component/Auth/Login';
import Logout from './Component/Auth/Logout';
import Register from './Component/Auth/Register';
import Dashboard from './Component/Dashboard/Dashboard';
import ErrorPage from './Component/Error/404';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import './App.css'
import Header from './Component/Header/Header'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,height: "100%",
    padding: theme.spacing(3),
    minHeight: "100vh",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  }
}));
export default function App() {
  const classes = useStyles();
  const cookies = new Cookies();
  const [user, setUser] = React.useState('');
  useEffect(() => {
    axios.get('/api/v1/auth/token', {
      headers: { 'XSRF-token': cookies.get('XSRF-token') || null }
    })
    .then(r=> {console.log(r);
      if(r && r.errors && r.errors.status)
      setUser({user: r.data});
      localStorage.setItem("user", r.data.userName);
      localStorage.setItem("loggedIn", true);
    })
    .catch(err => {
      localStorage.setItem("loggedIn", false);
      cookies.remove('XSRF-token');
    });
  }, []);
  return (
    <Router >
    {/* <Header user={user} /> */}
    <Switch>
      <Route exact path='/register' component={Register} />
      <Route exact path='/logout' component={Logout} />
      <Route exact path='/login' component={Login} />
      {(localStorage.getItem('loggedIn') && localStorage.getItem('loggedIn').length) ? null : <Redirect to="/login"> </Redirect>}
      <Route render={(props) => <div className={classes.root}><Header /><Dashboard user={user} /></div> } />
      <Route component={ErrorPage} />
    </Switch>
  </Router>
  )

}
