import React, { Component } from 'react';


const Like = (props) => {
  
let classes = props.liked ? "fa-solid fa-heart" : "fa-regular fa-heart";
        return (

            <i onClick={props.onClick} 
            //activates a pointer as cursor
            style={{cursor: "pointer"}}
            className={classes}></i>

        );
    }
 
export default Like;