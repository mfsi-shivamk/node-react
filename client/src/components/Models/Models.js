/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import MUItable from 'material-table';
import { ToastContainer } from 'react-toastify';
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import SaveIcon from "@material-ui/icons/Save";

import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper } from '@material-ui/core';
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

  const classes = useStyles();
  const handleEdit = (newData)=>{
    axios({
      method: "patch",
      url: constants.api.models.url,
      data: newData
  }).then(r => {
      console.log(r);
  })
  }
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
          editable={{
            onRowUpdate: (newData, oldData) =>{
              console.log(newData, oldData)
            return new Promise((resolve) => {
                setTimeout(() => {
                  handleEdit(newData);
                  resolve();
                }, 1000);
            })}
                    }}
      style={{width:"100%",height:"100%"}}
      title="Existing models"
      detailPanel={rowData => {
        var vocab = null;
        const json = rowData.json.topicModel;
        const topicNum = rowData.topics;
        var createLDATable = function(probs) {
          var data =[]
          for (var i = 0; i < probs.length; i++) {
            var word = vocab[i];
            var prob = (probs[i] * 100).toFixed(3) + '%';
            data.push({word, prob});
          }
          function compare( a, b ) {
            if ( a.prob < b.prob ){
              return 1;
            }
            if ( a.prob > b.prob ){
              return -1;
            }
            return 0;
          }
          
          data= data.sort(compare);
          return data;
      };
        vocab = json.hypers.vocab;
        var posteriors_lda = json.posteriors;
         
        return <Box display="flex" flexDirection="row">
        {Array.from(Array(topicNum).keys()).map((r,i)=><Paper elevation={3}
        key={r}  
        style={{width:"50%"}}
        ><MUItable 
        searchable={false}
        tableLayout="fixed"
        options={{
          tableLayout: "fixed",
          search: false
        }}
        title={"Topic "+r}
         columns={[
           {title:"Word", field:"word"},
           {title:"Probabilty", field:"prob",}
         ]}
         data={createLDATable(posteriors_lda.phi[i])}
        /></Paper>) }</Box>
      }}
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
    </main>
  );
}
export default Models;