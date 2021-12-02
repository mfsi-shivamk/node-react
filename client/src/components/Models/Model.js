/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import MUItable from 'material-table';
import { ToastContainer } from 'react-toastify';
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import SaveIcon from "@material-ui/icons/Save";

import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TextField } from '@material-ui/core';
import axios from '../../axios';
import { constants } from '../../config/constant';

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
}));
const Models = () => {
  const [sentence, setSentance]=useState("This is some text.") 
const [open, setOpen] =useState(false)
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const [rowData, setRowData]= useState({})
  const Predict = () => {
    const newData = {
      id: rowData.id,
      sentence: sentence
    }
    axios({
      method: constants.api.predict.method,
      url: constants.api.predict.url,
      data: newData
  }).then(r => {
      console.log(r);
      alert(r.data.data.join(' ,'));
  })
  }
  const handleC = (e)=>{setSentance(e.target.value);console.log(e.target.value,'e')}

  const [data, setData]= useState([])
  useEffect(() => {
    axios({
      method: constants.api.models.method,
      url: constants.api.models.url
  }).then(r => {
      console.log(r);
      setData(r.data.data);
  })
  }, []);
  return (
    <main style={{ backgroundColor: "white", height: "100%" }} className={classes.content}>
      <div className={classes.toolbar} />
      <ToastContainer />
      
      <MUItable
      icons={{
        Clear: () => <DeleteIcon />,
        Search: () => <SearchIcon />,
        ResetSearch: () => <DeleteIcon />,
        Save: ()=><SaveIcon/>
      }}
      actions={[
        {
          icon: 'eye',
          tooltip: 'Predict',
          onClick: (event, rowData) => {
            // Do save operation;
            setRowData(rowData);
            setOpen(true);
          }
        }
      ]}
      style={{width:"100%",height:"100%"}}
      title="Existing models"
      columns={[
        { title: 'Id', field: 'id' },
        { title: 'Name', field: 'name' },
        { title: 'Topics', field: 'topics', type: 'numeric'  },
        { title: 'Custom Topics', field: 'customTopic', type: 'array'  },
        { title: 'Terms', field: 'terms', type: 'numeric' },
        { title: 'Data', field: 'text', type: 'text' ,
        render: rowData => {
          return String(rowData.text).substring(0,100)+"..."}},
        { title: 'Model', field: 'json', type: 'object',
        render: rowData => {
          return JSON.stringify(rowData.json).toString().substring(0,100)+"..."}
      },
        { title: 'Date Create', field: 'createdAt', type: 'date' },
      ]}
      data={data}
      />
       <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title"> Predictor </DialogTitle>
      <DialogContent>
      <Paper>
            <Box>
          <TextField onChange={handleC} value={sentence} fullWidth placeholder="Enter your sentance"></TextField>
        </Box>
        </Paper>
      </DialogContent>
      <DialogActions>
          <Button onClick={Predict}>Predict</Button>
      </DialogActions>
      </Dialog>
    </main>
  );
}
export default Models;