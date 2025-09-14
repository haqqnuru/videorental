import React from 'react';
import Joi from "joi-browser";
import Form from '../common/form';


class RegisteForm extends Form {
   state= {
       data: {
           username:'',
           password:'',
           name: ''
       },
       errors: { }
   }
   
   // schema for Joi
    schema = {
       username: Joi.string().required().email().label("Username"),
       password: Joi.string().required().min(5).label("Password"),
        name: Joi.string().required().label("Name")
     };


     doSubmit = () => {


     }
    render() { 
        return (
<div className="container mt-5" style={{ maxWidth: '400px' }}>
    <h1>Register</h1>

{/* this handles all submit in the form */}
    <form onSubmit={this.handleSubmit}>

{/* shows username */}
{this.renderInput("username", "Username", "text", "We'll never share your email with anyone else.")}

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
