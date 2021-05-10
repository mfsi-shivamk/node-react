import React from 'react'
// import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';

import axios from '../../axios';
import { constants } from '../../config/constant';
const useStyles = makeStyles(() => ({ cardHeader: { textAlign: 'center', padding: "50px" } }));

function Logout() {
  const classes = useStyles();
    React.useEffect(() => {
        axios({
            method: constants.api.logout.method,
            url: constants.api.logout.url
        })
        .then(() => { window.location.href = '/login' })
    })
    return (
        <div >
            <Grid container spacing={3} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card login="true" >
                        <CardHeader className={classes.cardHeader} title="Logging out ...." color="rose" />
                    </Card>
                </Grid>
            </Grid>
        </div>

    )
}

export default Logout;
