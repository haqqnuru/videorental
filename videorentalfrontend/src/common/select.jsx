import React from 'react';


//this is a REUSABLE component

const Select = ({name, label, options, error, ...rest}) => {
    return ( 
        <div className="mb-3">

    <label htmlFor={name} className="form-label">{label}</label>
   
    <select className="form-control" 
    {...rest}
    name={name} 
    id={name}>
    <option value=''/> 
    {options.map(option => (
        <option key={option._id} value={option._id}>
            {option.name}
        </option>)
    )}
</select>
    {error && <div className="alert alert-danger">{error}</div>}
 </div>

     );
}
 
export default Select;