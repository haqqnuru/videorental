import React, { Component } from 'react';
import auth from '../services/authService';



class Logout extends Component {
 
    componentDidMount() {
        // it has been put in the authServices
        // localStorage.removeItem('token');
        auth.logout();
        
        //redirects to homepage
        window.location = "/"
    }

    render() { 
        return null;
    }
}
 
export default Logout;