import React from 'react';
import Joi from "joi-browser";
import Form from '../common/form';


// note: it extends form and not component
class LoginForm extends Form {
state= {
    data: {
        username:'',
        password:''
    },
    errors: { }
}

// schema for Joi
 schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password")
  };

    doSubmit = () => {

    }
    
    render() { 

        return (
<div className="container mt-5" style={{ maxWidth: '400px' }}>
    <h1>Login</h1>

{/* this handles all submit in the form */}
    <form onSubmit={this.handleSubmit}>

{/* shows username */}
{this.renderInput("username", "Username", "text", "We'll never share your email with anyone else.")}

{/* shows password fields */}
{this.renderInput("password", "Password", "password")}

{/* shows the button */}
{this.renderButton('Login')}
  
</form>
</div>

        );
    }
}
 
export default LoginForm;