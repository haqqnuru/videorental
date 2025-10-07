import React from 'react';
import Joi from "joi-browser";
//import { useNavigate } from "react-router-dom";

import Form from '../common/form';
import auth from '../services/authService';



// note: it extends form and not component
class LoginForm extends Form {
state= {
    data: {
        email:'',
        password:''
    },
    errors: { }
}

// schema for Joi
 schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password")
  };

  // handles submit login
    doSubmit = async() => {
        try {
            const {data} = this.state;
    await auth.login(data.email, data.password);
    // redirects to homepage
      window.location = "/";
        } catch (ex) {
           if(ex.response && ex.response.status === 400) {
            const errors = {...this.state.errors};
            errors.email = ex.response.data;
            this.setState({errors});
           } 
        }

    }
    
    render() { 

        return (
<div className="container mt-5" style={{ maxWidth: '400px' }}>
    <h1>Login</h1>

{/* this handles all submit in the form */}
    <form onSubmit={this.handleSubmit}>

{/* shows username */}
{this.renderInput("email", "Email", "text", "We'll never share your email with anyone else.")}

{/* shows password fields */}
{this.renderInput("password", "Password", "password")}

{/* shows the button */}
{this.renderButton('Login')}
  
</form>
</div>

        );
    }
}
 
//wrapper to inject navigate

// no need anymore
// function LoginFormWrapper(props) {
//   const navigate = useNavigate();
//   return <LoginForm {...props} navigate={navigate} />;
// }

export default LoginForm;
