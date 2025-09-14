import React from 'react';


//this is a REUSABLE component

const Input =({name, label, error, helpText, ...rest}) => {
    return ( 
        <div className="mb-3">

    <label htmlFor={name} className="form-label">{label}</label>
   
    <input className="form-control" 
    {...rest}
    name={name} 
    id={name}/>

    {helpText && <div id={`${name}Help`} className="form-text">{helpText}</div>}

    {error && <div className="alert alert-danger">{error}</div>}
 </div>

     );
}
 
export default Input;