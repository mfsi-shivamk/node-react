import { gql, useMutation } from '@apollo/client';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import $ from 'jquery';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
const submit = gql`
  mutation EYE_MUTATION(
  $score1: Float!
  $score2: Float!
  $score3: Float!
){
    eyeTest(score1: $score1, score2:$score2, score3: $score3) {
    id
    
    }
}`;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  content: {
    flexGrow: 1,height: "100%",
    padding: theme.spacing(3),
    minHeight: "100vh",
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Colour Vision Check', 'Contrast Check', 'Visual acuity test'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <div id="game1"><div id="container"></div>
      <h1 id="timeleft">The task of the test is to identify the odd tile.  </h1>
      <Grid container spacing={0}>
      <Grid item xs={12}>
          <Typography variant="overline" display="block" gutterBottom>
          Use your mouse to click the tile which is colored slightly differently as compared to the others..
          </Typography>
        </Grid>
      </Grid></div>;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {

const [submitTest] = useMutation(submit, {
    variables: {
        score1 : localStorage.getItem('1-score') ? Number(localStorage.getItem('1-score')) : 0,
        score2 : localStorage.getItem('2-score') ? Number(localStorage.getItem('2-score')) : 0,
        score3:  localStorage.getItem('3-score') ? Number(localStorage.getItem('3-score')) : 0
    },
    onCompleted: (r) => {
      window.location.href = ('/eye-test');
    }
  });
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  React.useEffect(()=>{
    localStorage.removeItem('1-score')
    localStorage.removeItem('2-score')
    localStorage.removeItem('3-score')
  })
  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if(activeStep===2)submitTest();
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  
  return (
    <main style={{backgroundColor:"white", height:"100%"}}className={classes.content}>
      <CssBaseline />
      
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
          Online Vision Screening
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                Thank you for participating in the online vision screening check.
                </Typography>
                <Typography variant="subtitle1" >
                Colour Vision Check : {localStorage.getItem('1-score') || 0 }<br/>
                Contrast Check : {localStorage.getItem('2-score') || 0 }<br/>
                Visual acuity test: {localStorage.getItem('3-score') || 0 }<br/>
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {false && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    id="next"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
        

        <script></script>
      </main>
    </main>
  );
}