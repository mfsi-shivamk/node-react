import Cookies from 'universal-cookie';
import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from "@material-ui/core/FormControl";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

import Email from '@material-ui/icons/Email';
import Lock from '@material-ui/icons/Lock';

import axios from '../../axios';
import { constants } from '../../config/constant';

const cookies = new Cookies();
const useStyles = makeStyles((theme) => ({ 
  inputPadding: { padding: '8px' }, paperContainer: {}, cardHeader: { textAlign: 'center' }, 
  buttonPadding: { marginBottom: '1px', marginTop: '25px' }, 
  root: { flexGrow: 1, justifyContent: 'center' }, 
  cardHidden: { opacity: "0", transform: "translate3d(0, -60px, 0)" }, 
  paper: { padding: theme.spacing(2), margin: 'auto', maxWidth: 500, }, 
  image: { width: 128, height: 128, }, 
  img: { margin: 'auto', display: 'block', maxWidth: '100%', maxHeight: '100%', }, 
}));

export default function ComplexGrid() {
  const classes = useStyles();

  const [errors, setErrors] =  React.useState({phone: false, password: false})

  const [formData, setFormData] = React.useState({ phone: '', password: '' });

  const login = function () {
    axios({
      method: constants.api.login.method,
      url: constants.api.login.url,
      data: formData
    })
      .then(r => {
        toast.success(constants.notification.login.s);
        cookies.set(constants.cookie.key, r.data.token, { path: '/' });
        setTimeout(() => {
          window.location = "/";
        }, 1000)
      })
      .catch(error => {
        if (error && error.response && error.response.data && error.response.data.isJoi) {
          const [{ message: msg }] = error.response.data.details;
          toast.error(msg);
          const temp = errors;
          temp[error.response.data.details[0].context.key] = true;
          setErrors({...temp})
        }
        else if (error && error.response && error.response.data && error.response.data.errors) {
          const [msg] = error.response.data.errors;
          toast.error(msg);
        }
        else toast.error(constants.notification.login.d);
      })
  }

  
  return (
    <div >
      <Grid container spacing={3} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={10} sm={6} md={6}>
          <Card login="true" >
            <CardHeader className={classes.cardHeader} title="Log in" color="rose" >
            </CardHeader>
            <CardContent>
              <form noValidate autoComplete="off">
                <FormControl fullWidth={true}>
                  <Input  error={errors.phone}  onChange={(e) => { setFormData({ ...formData, phone: e.target.value }) }} placeholder="Phone or Email" className={classes.inputPadding} id="phone" endAdornment={<InputAdornment position="start"> <Email /> </InputAdornment>} />
                </FormControl>
                <FormControl fullWidth={true}>
                  <Input  error={errors.password}  onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }} placeholder="Password" className={classes.inputPadding} id="password" endAdornment={<InputAdornment position="start"> <Lock /> </InputAdornment>} />
                </FormControl>
                <Box textAlign='center'>
                  <Button className={classes.buttonPadding} onClick={() => { login(); }} color="secondary">Login</Button>
                </Box>
                <Box textAlign='center'>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid >
      </Grid>
      <ToastContainer />
    </div>
  );
}