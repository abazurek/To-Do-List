import React, {useState} from "react";

import {faEdit} from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SingleTask({title, message, symbole}) {

    const [color, setColor]=useState(false);

    function clickDiv() {
       color? setColor(false) : setColor(true);
       console.log(color)
    }

    return(
        <div className='single-task-box'>
            <div className='single-task-title-box'>
                <h4>{title}</h4>
                {symbole==="circle"?  <div style={color? { backgroundColor:"red"}: {backgroundColor:'white'}} onClick={clickDiv} className='check-div icon' />:''}
                {symbole==="edit"?  <FontAwesomeIcon className='icon' icon={faEdit}/>:''}
                {symbole==="done"?  <FontAwesomeIcon className='icon' icon={faCheckCircle}/>:''}

            </div>
            <p className='message'>{message}</p>
        </div>
    )
}