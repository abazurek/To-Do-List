import React from "react";
import { faPlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SingleTask from "./SingleTask";
import {connect} from "react-redux";

function TaskBox({title, count, toDo, progress, done}) {

    const [newTask, setNewTask]=useState(false);

    function clickButton (){
       newTask? setNewTask(false):setNewTask(true)
    }

    return(
        <div className='task-box'>
            <div className='task-title-box'>
                <h3 className='task-title'>{title} <span>({count})</span></h3>
                <button className='add-button' onClick={clickButton}><span>Dodaj</span> <FontAwesomeIcon icon={faPlus}/></button>
            </div>
            <div>{newTask? <SingleTask mainTitle={title} title='Wpisz tytuł..' message="Tutaj wpisz opis.." symbole='circle' input={true}/> : ''}
                {toDo && title==='Do zrobienia'? toDo.map(item=> <SingleTask key={item.id} title={item.title} message={item.message} symbole='circle' input={false}/>)  :'' }
                {progress && title==='W trakcie'? progress.map(item=> <SingleTask key={item.id} title={item.title} message={item.message} symbole='edit' input={false}/>)  :''}
                {done && title==='Zrobione'? done.map(item=> <SingleTask key={item.id} title={item.title} message={item.message} symbole='done' input={false}/>)  :''}
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