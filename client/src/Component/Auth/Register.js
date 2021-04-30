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
import Phone from '@material-ui/icons/Phone';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { gql, useMutation } from '@apollo/client';
const cookies = new Cookies();
const useStyles = makeStyles((theme) => ({ inputPadding:{  padding: '8px' }, paperContainer: { }, cardHeader:{textAlign: 'center' }, buttonPadding:{  marginBottom: '1px', marginTop:'25px' }, root: { flexGrow: 1, justifyContent: 'center'},  cardHidden: { opacity: "0", transform: "translate3d(0, -60px, 0)" }, paper: { padding: theme.spacing(2), margin: 'auto', maxWidth: 500, }, image: { width: 128, height: 128, }, img: { margin: 'auto', display: 'block', maxWidth: '100%', maxHeight: '100%', }, }));

export default function ComplexGrid() {
  const history = useHistory();
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
  const [formState, setFormState] = React.useState({
    email: '',
    firstName: '',
    key: ''
  });
  const registers = gql`
  mutation REGISTER_MUTATION(
  $email: String!
  $firstName: String!
  $key: String!
){
  signup(email: $email, key:$key, firstName: $firstName) {
    user {
          id
          firstName
        }
    		token
    }
} `;
  const [register] = useMutation(registers, {
    variables: {
      email : formState.email, firstName : formState.firstName,
      key: formState.key
    },
    onCompleted: (r) => {
      console.log(r);
      const { signup } = r;
      cookies.set('XSRF-token', signup.token, { path: '/' });
      history.push('/');
    }
  });
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
                        <Input placeholder="First Name"  onChange={(e) => setFormState({ ...formState, firstName: e.target.value }) }  className={classes.inputPadding} id="firstName" endAdornment={ <InputAdornment position="start"> <Phone /> </InputAdornment> } />
                        <Input placeholder="Email" onChange={(e) => setFormState({ ...formState, email: e.target.value }) }  className={classes.inputPadding} id="lastName" endAdornment={ <InputAdornment position="start"> <Email /> </InputAdornment> } />
                        <Input placeholder="Password"  onChange={(e) => setFormState({ ...formState, key: e.target.value }) }  className={classes.inputPadding} id="phone" endAdornment={ <InputAdornment position="start">  <Lock /></InputAdornment> } />
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