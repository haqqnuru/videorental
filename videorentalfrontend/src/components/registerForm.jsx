import React from 'react';
import Joi from "joi-browser";
import Form from '../common/form';
import * as userService from '../services/userService'


class RegisteForm extends Form {
   state= {
       data: {
           email:'',
           password:'',
           name: ''
       },
       errors: { }
   }
   
   // schema for Joi
    schema = {
       email: Joi.string().required().email().label("Email"),
       password: Joi.string().required().min(5).label("Password"),
        name: Joi.string().required().label("Name")
     };


     doSubmit = async() => {

        try { 
        await userService.register(this.state.data);
}
catch (ex) {
    if (ex.response && ex.response.status === 400) {
        const errors = {...this.state.errors};
        errors.email = ex.response.data;
        this.setState({errors});
    }
}

     }
    render() { 
        return (
<div className="container mt-5" style={{ maxWidth: '400px' }}>
    <h1>Register</h1>

{/* this handles all submit in the form */}
    <form onSubmit={this.handleSubmit}>

{/* shows username */}
{this.renderInput("email", "Email", "text", "We'll never share your email with anyone else.")}

{/* shows password fields */}
{this.renderInput("password", "Password", "password")}

{/* shows name fields */}
{this.renderInput("name", "Name")}

{/* shows the button */}
{this.renderButton('Register')}
  
</form>
</div>

        );
    }
}
 
export default RegisteForm;
