import React, { useState} from 'react';
import { constants, defaultModelData } from '../../config/constant';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import FormControl from "@material-ui/core/FormControl";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from '../../axios';
import { CircularProgress, InputLabel, TextField } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        height: "100%",
        padding: theme.spacing(3),
        minHeight: "100vh",
    },
    inputPadding:{
      padding:"15px"
    }
}));

export default function MiniDrawer() {
    const classes = useStyles();
    const [state, setState] = useState({...defaultModelData, name:"" });
    const [loading, setLoading] = useState(false);
    const handleChange = (key)=>(e) => {
      setState(prev=>({...prev, [key]: e.target.value }))
    }
    const handleSave = () => {
      setLoading(true);
        const formData = {
            ...state
        }
        axios({
            method: constants.api.model.method,
            url: constants.api.model.url,
            data: formData
        }).then(r => {
      setLoading(false);

            console.log(r);
        })
    }
    return ( <main style = { { backgroundColor: "white", height: "100%" } } className = { classes.content } >
        <div className = { classes.toolbar }/> 
        <Card login="true" >
            <CardHeader className={classes.cardHeader} title="Create new Model" color="rose" >
            </CardHeader>
            <CardContent>
              <form noValidate autoComplete="off">
              <FormControl fullWidth={true}  >
                <InputLabel>Model Name</InputLabel>
                  <Input  
                   onChange={handleChange('name')} 
                   value={state.name}
                   placeholder="Model Name" className={classes.inputPadding} 
                   />
                </FormControl>
                <FormControl fullWidth={true}>
                <InputLabel>Number of topics</InputLabel>

                  <Input type="number"  
                   value={state.topics}
                  
                  onChange={handleChange('topics')} 
                  placeholder="Topics" className={classes.inputPadding} 
                  />
                </FormControl>
                <FormControl fullWidth={true}>
                <InputLabel>Number of terms</InputLabel>

                  <Input type="number"  onChange={handleChange('terms')} 
                   value={state.terms}

                  placeholder="Terms" className={classes.inputPadding} 
                  />
                </FormControl>
                <FormControl fullWidth={true}>
                <InputLabel>Model Data-Set</InputLabel>
                  <TextField  
                   disabled
                   value={JSON.stringify(state.text)}
                   multiline
                   rows={13}
                   placeholder="Date set" 
                   className = { classes.inputPadding }
                   />
                </FormControl>
                <Box textAlign='center'>
                  <Button className={classes.buttonPadding} 
                  onClick={() => { handleSave(); }} color="secondary">Save new Model</Button>
                </Box>
              </form>
              {loading&&<CircularProgress/>}
            </CardContent>
          </Card>
        </main>
    );
}