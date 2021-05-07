import React, { useEffect } from 'react'
import axios from '../../axios';
import Cookies from 'universal-cookie';
import Header from '../Header/Header';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    }
}));
export default (WrappedComponent) => {
    function requireAuth(props) {
        const classes = useStyles();
        const cookies = new Cookies();
        const [user, setUser] = React.useState('');
        useEffect(() => {
            axios.get('/api/v1/auth/token', {
                headers: { 'XSRF-token': cookies.get('XSRF-token') || null }
            })
            .then(r => {
                setUser({ user: r.data });
            })
            .catch(err => {
                if (err.response && err.response.status == 403) window.location.href = '/login';
            });
        }, []);
        return (
            <div className={classes.root}><Header />
                <WrappedComponent {...props} {...user}/>
            </div>
        )
    }

    return requireAuth;
};