import Joi from 'joi-browser';
import React, { Component } from 'react';
import Input from './input';
import Select from './select';


//this is a REUSABLE component

class Form extends Component {
    state = { 
        data: {},
        errors: {}
     } 


     // validation of form using joi
validate = () => {
const options = {abortEarly:false};
const {error} = Joi.validate(this.state.data, this.schema, options);
if (!error) return null;

const errors = {};
for (let item of error.details)
    errors[item.path[0]] = item.message;
return errors

}

// validate the input, message appears when input is deleted
    validateProperty = ({name, value}) => {
const obj = {[name]: value};
const schema = {[name]: this.schema[name]};
const {error} = Joi.validate(obj, schema);
return error ? error.details[0].message : null;     
    }
    

 handleSubmit = e => {
        // this prevent the submission of the form to cause a full page reload
        e.preventDefault();

        // prevent submission if invalid
        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;

        this.doSubmit();
    }
 
    // handles change in the input fields
    handleChange = ({currentTarget: input}) => {
        // show errors when typing
        const errors = {... this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

// handles the change of the fields or input
        const data = {...this.state.data};
        data[input.name] =input.value;

        this.setState({data, errors})
    }

// deals with the form button
    renderButton(label) {
        return (
        <button type="submit" 
  className="btn btn-primary"
  //disables the button when either input is empty
disabled={!!this.validate()}>{label}</button>
    )}


    // extracts for inputs
renderInput(name, label, type = "text", helpText = "") {
    const { data, errors } = this.state;
    return (
        <Input
            name={name}
            type={type}
            value={data[name]}
            label={label}
            onChange={this.handleChange}
            error={errors[name]}
            helpText={helpText} 
        />
    );
}

// extracts for selections
renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
     <Select
      name={name}
            value={data[name]}
            label={label}
            options={options}
            onChange={this.handleChange}
            error={errors[name]}
            />
    );
}

}


export default Form;