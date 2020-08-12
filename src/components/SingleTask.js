import React, {useState} from "react";

import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {connect} from "react-redux";
import operations from "../redux/tasks/operations";


const information = {
    "category": "",
    "title": "",
    "message": ""
};


function SingleTask({mainTitle, title, message, item, symbole, input,buttons, postData,putData, deleteData}) {

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
        const id=item.id;
        putData(id,data);
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

    function removeTask() {
       deleteData(item.id)
    }

    function changeStatusTask(category) {

        const data = {"category": category, "title": titleValue, "message": messageValue};
        const id=item.id;
        putData(id,data);

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
                    <div className='single-task-box' >
                        <div className='single-task-title-box'>
                            {toEdit?
                                <input value={titleValue} onChange={({target})=>setTitleValue(target.value)} />
                                :
                                <h4 onClick={clickToEdit} className='single-task-title'>{title}</h4>}
                            {symbole === "circle" ?
                               <div className='icons-div'>
                                   <div style={color ? {backgroundColor: "red"} : {backgroundColor: 'white'}}
                                     onClick={clickDiv} className='check-div icon'/>
                                     <FontAwesomeIcon onClick={removeTask} icon={faTrashAlt}/>
                               </div>
                                : ''}
                            {symbole === "edit" ?
                                <div className='icons-div'>
                                    <FontAwesomeIcon onClick={clickToEdit} className='icon' icon={faEdit}/>
                                    <FontAwesomeIcon onClick={removeTask} icon={faTrashAlt}/>
                                </div>
                                : ''}
                            {symbole === "done" ?
                                <div className='icons-div'>
                                    <FontAwesomeIcon className='icon' icon={faCheckCircle}/>
                                    <FontAwesomeIcon onClick={removeTask} icon={faTrashAlt}/>
                                </div>
                                : ''}

                        </div>
                        {toEdit? <textarea value={messageValue} onChange={({target})=> setMessageValue(target.value)} /> :   <p onClick={clickToEdit} className='message'>{message}</p>}

                        <span className='warning'>{warning}</span>
                        <div className='edit-buttons-box'>
                            {buttons.map(item=>
                                <button className='change-status-button' onClick={()=>changeStatusTask(item)}>
                                    Przenieś do: '{item}'
                                </button>)}
                        </div>

                    </div>

                    {toEdit ? <button className='edit-button' onClick={finishEdit}>Zakończ edycję</button> : ""}
                </>
            }
        </>
    )
}



const mapDispatchToProps = dispatch => ({
    postData: (data) => dispatch(operations.postData(data)),
    putData:(id,data)=>dispatch(operations.putData(id,data)),
    deleteData:(id)=>dispatch(operations.deleteData(id))
});

export default connect(null, mapDispatchToProps)(SingleTask);