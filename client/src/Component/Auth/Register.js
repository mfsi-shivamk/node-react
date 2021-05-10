import Link from '@material-ui/core/Link';
import Cookies from 'universal-cookie';
import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from "@material-ui/core/FormControl";
import Email from '@material-ui/icons/Email';
import Lock from '@material-ui/icons/Lock';
import Phone from '@material-ui/icons/Phone';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import axios from '../../axios';
import AddAlert from "@material-ui/icons/AddAlert";

import Snackbar from '../Notification/Snackbar';

const useStyles = makeStyles((theme) => ({ inputPadding:{  padding: '8px' }, paperContainer: { }, cardHeader:{textAlign: 'center' }, buttonPadding:{  marginBottom: '1px', marginTop:'25px' }, root: { flexGrow: 1, justifyContent: 'center'},  cardHidden: { opacity: "0", transform: "translate3d(0, -60px, 0)" }, paper: { padding: theme.spacing(2), margin: 'auto', maxWidth: 500, }, image: { width: 128, height: 128, }, img: { margin: 'auto', display: 'block', maxWidth: '100%', maxHeight: '100%', }, }));

export default function ComplexGrid() {
  const classes = useStyles();
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  const [notify, setNotify] = React.useState(false);
  const [danger, setDanger] = React.useState(false);
  const [info, setInfo] = React.useState(false);
  const [customDanger, setCustomDanger] = React.useState(false);
  const [customMsg, setCustomMsg] = React.useState('');
  
  const didMount = useRef(false);

  React.useEffect(() => {
    if (didMount.current) showNotification('c');
    else didMount.current = true;
  },[customMsg])

const showNotification = (type) => {
  switch (type) {
    case "s": {
      setNotify(true);
      setTimeout(function () {
        setNotify(false);
      }, 6000);
    }
    case "d": {
      setDanger(true);
      setTimeout(function () {
        setDanger(false);
      }, 6000);
    }
    case "i": {
      setInfo(true);
      setTimeout(function () {
        setInfo(false);
      }, 6000);
    }
    case "c": {
      setCustomDanger(true);
      setTimeout(function () {
        setCustomDanger(false);
      }, 6000);
    }
  }

}
  React.useEffect(() => {
    let id = setTimeout(function() {
      setCardAnimation("");
    }, 700);
    return function cleanup() {
      window.clearTimeout(id);
    };
  });

  const register = function(event){
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    axios({
        method: 'post',
        url: '/api/v1/auth/register',
        data: {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            password: password,
            email: email
        }
      })
      .then( r=>{
          showNotification('s');
          setTimeout(()=>{
            window.location = "/login";
          },1000)
      })
      .catch(error => {
        if (error.response) {
          if(error.response.data.isJoi){
          const [{message: msg}] = error.response.data.details
          setCustomMsg(msg);}
          else {
            const [msg] = error.response.data.errors;
            setCustomMsg(msg);
          }

        }
        else showNotification('d');
      })
}
  return (
      <div >
    <Grid container  spacing={3} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={6} md={4}>
            <form noValidate autoComplete="off">
                <Card login="true" className={classes[cardAnimaton]}>
                <CardHeader className={classes.cardHeader}title="Register"color="rose" >
              </CardHeader>
              <CardContent>
                  <FormControl fullWidth={true}>
                        <Input placeholder="First Name" className={classes.inputPadding} id="firstName" endAdornment={ <InputAdornment position="start"> <Email /> </InputAdornment> } />
                        <Input placeholder="Last Name" className={classes.inputPadding} id="lastName" endAdornment={ <InputAdornment position="start"> <Lock /> </InputAdornment> } />
                        <Input placeholder="Email" className={classes.inputPadding} id="email" endAdornment={ <InputAdornment position="start"> <Email /> </InputAdornment> } />
                        <Input placeholder="Phone" className={classes.inputPadding} id="phone" endAdornment={ <InputAdornment position="start"> <Phone /> </InputAdornment> } />
                        <Input placeholder="Password" className={classes.inputPadding} id="password" endAdornment={ <InputAdornment position="start"> <Phone /> </InputAdornment> } />
                  </FormControl>
                  <Box textAlign='center'>
                  <Button className={classes.buttonPadding} onClick={()=>{register();}} color="secondary">Register</Button>
                  </Box>
                  <Link href="/login" variant="body2">
                {"Already have an account? Login"}
              </Link>
              </CardContent>
                </Card>
            </form>
        </Grid >
    </Grid>
    <Snackbar place='tr' color='success' icon={AddAlert} message='Logged in successfully.' open={notify} closeNotification={() => setNotify(false)} close />
    <Snackbar place='tr' color='info' icon={AddAlert} message='Login credentials updated.' open={info} closeNotification={() => setInfo(false)} close />
    <Snackbar place='tr' color='danger' icon={AddAlert} message='Invalid credentials.' open={danger} closeNotification={() => setDanger(false)} close />
    <Snackbar place='tr' color='danger' icon={AddAlert} message={customMsg} open={customDanger} closeNotification={() => setCustomDanger(false)} close />
      
      </div>
  );
}