import { useHistory } from 'react-router';
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
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
// import axios from '../../axios';
import { gql, useMutation } from '@apollo/client';


const useStyles = makeStyles((theme) => ({ inputPadding:{  padding: '8px' }, paperContainer: { }, cardHeader:{textAlign: 'center' }, buttonPadding:{  marginBottom: '1px', marginTop:'25px' }, root: { flexGrow: 1, justifyContent: 'center'},  cardHidden: { opacity: "0", transform: "translate3d(0, -60px, 0)" }, paper: { padding: theme.spacing(2), margin: 'auto', maxWidth: 500, }, image: { width: 128, height: 128, }, img: { margin: 'auto', display: 'block', maxWidth: '100%', maxHeight: '100%', }, }));

export default function ComplexGrid() {
  const history = useHistory();

  const cookies = new Cookies();
  const [formState, setFormState] = React.useState({
    email: '',
    password: ''
  });
  const logins =  gql`
  mutation LOGIN_MUTATION(
  $email: String!
  $password: String!
){
  login(email: $email, key:$password) {
    user {
          id
      		smsSent {
      		id
      		body
  					otp
      		}
        }
    		token
    }
} `;
  const classes = useStyles();
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  React.useEffect(() => {
    let id = setTimeout(function() {
      setCardAnimation("");
    }, 700);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.clearTimeout(id);
    };
  });
  const [login] = useMutation(logins, {
    variables: {
      email : formState.email, password : formState.password
    },
    onCompleted: (r) => {
      console.log(r);
      const { login } = r;
      cookies.set('XSRF-token', login.token, { path: '/' });
      history.push('/');
    }
  });
  return (
      <div >
    <Grid container  spacing={3} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={6} md={4}>
            <form noValidate autoComplete="off">
                <Card login="true" className={classes[cardAnimaton]}>
                <CardHeader className={classes.cardHeader}title="Log in"color="rose" >
              </CardHeader>
              <CardContent>
                  <FormControl fullWidth={true}>
                        <Input placeholder="Email" onChange={(e) => setFormState({ ...formState, email: e.target.value }) } className={classes.inputPadding} id="email" endAdornment={ <InputAdornment position="start"> <Email /> </InputAdornment> } />
                        <Input placeholder="Password" onChange={(e) => setFormState({ ...formState, password: e.target.value }) } className={classes.inputPadding} id="password" endAdornment={ <InputAdornment position="start"> <Lock /> </InputAdornment> } />
                  </FormControl>
                  <Box textAlign='center'>
                  <Button className={classes.buttonPadding} onClick={()=>{login();}} color="secondary">Login</Button>
                  </Box>
              </CardContent>
                </Card>
            </form>
        </Grid >
    </Grid>
      </div>
  );
}