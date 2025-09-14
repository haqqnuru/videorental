import React from 'react';
import Input from '../common/input';



const SearchBox = ({value, onChange}) => {
    return ( 

        <Input
        type ='text'
        className = 'form-control my-3'
        placeholder= 'search...'
        value ={value}
        onChange = {e => onChange(e.currentTarget.value)}
        />
     );
}
 
export default SearchBox;