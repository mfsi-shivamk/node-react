import Cookies from 'universal-cookie';
import React from 'react';
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
const cookies = new Cookies();
const useStyles = makeStyles((theme) => ({ inputPadding:{  padding: '8px' }, paperContainer: { }, cardHeader:{textAlign: 'center' }, buttonPadding:{  marginBottom: '1px', marginTop:'25px' }, root: { flexGrow: 1, justifyContent: 'center'},  cardHidden: { opacity: "0", transform: "translate3d(0, -60px, 0)" }, paper: { padding: theme.spacing(2), margin: 'auto', maxWidth: 500, }, image: { width: 128, height: 128, }, img: { margin: 'auto', display: 'block', maxWidth: '100%', maxHeight: '100%', }, }));

export default function ComplexGrid() {
  const classes = useStyles();
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

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
          setTimeout(()=>{
            window.location = "/";
          },1000)
      })
      .catch(e => {
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
              </CardContent>
                </Card>
            </form>
        </Grid >
    </Grid>
      </div>
  );
}