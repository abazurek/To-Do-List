import React,{useState} from "react";
import { faPlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SingleTask from "./SingleTask";
import {connect} from "react-redux";

function TaskBox({title, count, toDo, progress, done}) {

    const [newTask, setNewTask]=useState(false);

    function clickButton (){
       setNewTask(!newTask)
    }

    return(
        <div className='task-box'>
            <div className='task-title-box'>
                <h3 className='task-title'>{title} <span>({count})</span></h3>
                <button className='add-button' onClick={clickButton}><span>Dodaj</span> <FontAwesomeIcon icon={faPlus}/></button>
            </div>
            <div>{newTask? <SingleTask mainTitle={title} title='Wpisz tytuł..' message="Tutaj wpisz opis.."  input={true} showInput={setNewTask}/> : ''}
                {toDo && title==='Do zrobienia'? toDo.map(item=> <SingleTask key={item.id} title={item.title} message={item.message} item={item} symbole='circle' input={false} buttons={["W trakcie", "Zrobione"]}/>)  :'' }
                {progress && title==='W trakcie'? progress.map(item=> <SingleTask key={item.id} title={item.title} message={item.message} item={item} symbole='edit' input={false} buttons={["Do zrobienia", "Zrobione"]}/>)  :''}
                {done && title==='Zrobione'? done.map(item=> <SingleTask key={item.id} title={item.title} message={item.message} item={item} symbole='done' input={false} buttons={["Do zrobienia", "W trakcie"]}/>)  :''}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    toDo: state.task.toDo,
    progress: state.task.progress,
    done: state.task.done
});



export default connect(mapStateToProps)(TaskBox);