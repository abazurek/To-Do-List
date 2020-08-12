import React, {useState} from "react";

import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {connect} from "react-redux";
import operations from "../redux/tasks/operations";
import actions from "../redux/tasks/actions";

const information = {
    "category": "",
    "title": "",
    "message": ""
};


function SingleTask({mainTitle, title, message, item, symbole, input, postData,putData}) {

    const [color, setColor] = useState(false);
    const [warning, setWarning] = useState(information.message);
    const [toSend, setToSend] = useState(information);
    const [toEdit, setToEdit] = useState(false);
    const [titleValue, setTitleValue]=useState(title);
    const [messageValue, setMessageValue]=useState(message);


    function clickDiv() {
        color ? setColor(false) : setColor(true);
        console.log(color)
    }

    const finishEdit=() => {
        if(titleValue ===''){
            setWarning('Musisz wpisać tytuł aby dodać zadanie');
            return
        }
        const data= {"category":item.category, "title":titleValue, "message":messageValue};
        fetch(`http://localhost:3001/tasks/${item.id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => resp.json())
            .then(resp=>console.log(resp))
            .catch(err => console.log(err));
        putData(data);
        setToEdit(false);
    };

    function sendTask({e, mainTitle}) {
        e.preventDefault();
        if (toSend.title === '') {
            setWarning('Musisz wpisać tytuł aby dodać zadanie');
            return
        }
        postData({...toSend, category: mainTitle});
        setToSend(information);
    }

    function clickToEdit() {
        setToEdit(true)
    }





    return (
        <>
            {input ?
                <div className='single-task-box'>
                    <div className='single-task-title-box'>
                        <input value={toSend.title} type='text' placeholder={title}
                               onChange={({target}) => setToSend(prev => ({...prev, title: target.value}))}/>
                    </div>

                    <textarea value={toSend.message}
                              onChange={({target}) => setToSend(prev => ({...prev, message: target.value}))}
                              placeholder={message}/>
                    <span className='warning'>{warning}</span>
                    <button className='send-button' onClick={(e) => sendTask({mainTitle, e})}>Dodaj</button>
                </div>
                :
                <>
                    <div className='single-task-box' onClick={clickToEdit}>
                        <div className='single-task-title-box'>
                            {toEdit? <input value={titleValue} onChange={({target})=>setTitleValue(target.value)} /> :  <h4 className='single-task-title'>{title}</h4>}
                            {symbole === "circle" ?
                                <div style={color ? {backgroundColor: "red"} : {backgroundColor: 'white'}}
                                     onClick={clickDiv} className='check-div icon'/> : ''}
                            {symbole === "edit" ? <FontAwesomeIcon className='icon' icon={faEdit}/> : ''}
                            {symbole === "done" ? <FontAwesomeIcon className='icon' icon={faCheckCircle}/> : ''}

                        </div>
                        {toEdit? <textarea value={messageValue} onChange={({target})=> setMessageValue(target.value)} /> :   <p className='message'>{message}</p>}

                        <span className='warning'>{warning}</span>
                    </div>
                    {toEdit ? <button className='edit-button' onClick={finishEdit}>Zakończ edycję</button> : ""}
                </>
            }
        </>
    )
}



const mapDispatchToProps = dispatch => ({
    postData: (data) => dispatch(operations.postData(data)),
    putData:(data)=>dispatch(actions.putData(data))
});

export default connect(null, mapDispatchToProps)(SingleTask);