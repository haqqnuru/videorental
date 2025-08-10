import React from 'react';

const ListGroup = ({ items, textProperty, valueProperty, onItemSelect, selectedItem }) => (
   
   
   <ul className="list-group">
        {items.map(item => (
            <li 
                key={item[valueProperty]}
                // added cursor to it
        style={{cursor: "progress"}} 
                //makes list group active and inactive
                className={ 
                item === selectedItem ? "list-group-item active" : "list-group-item"}
                
                onClick={() => onItemSelect(item)}>

                {item[textProperty]}

            </li>
        ))}
    </ul>
);

// sets a default value to the props
ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
};

export default ListGroup;
