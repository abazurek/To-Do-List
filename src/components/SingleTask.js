import React from "react";

export default function SingleTask({title, message}) {

    return(
        <div className='single-task-box'>
            <div className='single-task-title-box'>
                <h4>{title}</h4>
                <div className='check-div'/>
            </div>
            <p className='message'>{message}</p>
        </div>
    )
}