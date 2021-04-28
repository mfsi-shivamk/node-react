import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class Logout extends Component {
   constructor(props) {
       super(props)
       cookies.remove('XSRF-token');
   }
   
    render() {
        return (
            <Redirect to="/login"> </Redirect>
        )
    }
}

export default Logout