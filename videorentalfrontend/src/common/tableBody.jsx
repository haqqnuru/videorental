import React, { Component } from 'react';
import _ from 'lodash';


class TableBody extends Component {
    
    //decides what value to display inside each <td> in the table, depending on the column definition.
renderCall = (item, column) => {
if (column.content) return column.content(item);
//lodash was used because you can not use nested properties
return _.get(item, column.path)
};

//  the key has conditions because not all the tb has a column path
createKey = (item, column) => {
    return item._id + (column.path || column.key)

}

    render() { 

        const {data, columns} = this.props;

        return (

            <tbody>
                {data.map(item => <tr key={item._id}>

                    {columns.map(column =><td key={this.createKey(item, column)}>
                        
                        {this.renderCall(item, column)}</td> )} 
                    
                </tr> )}
               
            </tbody>
        );
    }
}
 
export default TableBody;