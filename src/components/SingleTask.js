import React, {useState, useEffect} from "react";

import {faEdit} from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {connect} from "react-redux";
import operations from "../redux/tasks/operations";

const information={
    "category":"",
    "title":"",
    "message":""
};


function SingleTask({mainTitle,title, message, symbole, input,data, postData}) {

    const [color, setColor]=useState(false);

    const [warning, setWarning]=useState(information.message);

    const[toSend, setToSend]=useState(information);



    function clickDiv() {
       color? setColor(false) : setColor(true);
       console.log(color)
    }
    function sendTask({e, mainTitle}) {
        e.preventDefault();
        if(toSend.title===''){
            setWarning('Musisz wpisać tytuł aby dodać zadanie');
            return
        }
        postData({...toSend, category:mainTitle});
        setToSend(information);
    }

    return(
        <div className='single-task-box'>
            <div className='single-task-title-box'>
                {input? <input value={toSend.title} type='text' placeholder={title} onChange={({target})=>setToSend(prev=>({...prev, title:target.value}))}/> : <h4>{title}</h4>}
                {symbole==="circle"?  <div style={color? { backgroundColor:"red"}: {backgroundColor:'white'}} onClick={clickDiv} className='check-div icon' />:''}
                {symbole==="edit"?  <FontAwesomeIcon className='icon' icon={faEdit}/>:''}
                {symbole==="done"?  <FontAwesomeIcon className='icon' icon={faCheckCircle}/>:''}

            </div>
            {input? <textarea value={toSend.message} onChange={({target})=>setToSend(prev=>({...prev, message:target.value}))} placeholder={message}/>:  <p className='message'>{message}</p>}
            <span className='warning'>{warning}</span>
            {input? <button className='send-button' onClick={(e)=>sendTask({mainTitle,e})}>Dodaj</button>:''}

        </div>
    )
}
const mapStateToProps = state => ({
    data: state.task.data

});

const mapDispatchToProps = dispatch => ({
    postData: (data)=> dispatch(operations.postData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);