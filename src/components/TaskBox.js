import React from "react";
import { faPlus} from "@fortawesome/free-solid-svg-icons";
import { faEdit} from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SingleTask from "./SingleTask";
import {connect} from "react-redux";
import operations from "../redux/tasks/operations";

function TaskBox({title, count}) {

    return(
        <div className='task-box'>
            <div className='task-title-box'>
                <h3 className='task-title'>{title} <span>({count})</span></h3>
                <button className='add-button'><span>Dodaj</span> <FontAwesomeIcon icon={faPlus}/></button>
            </div>
            <div>
                <SingleTask title='Wpisz tytuł' message='jakaś informacja'/>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    toDo: state.task.toDo,
    progress: state.task.progress,
    done: state.task.done,
    data: state.task.data

});

const mapDispatchToProps = dispatch => ({
    getData: ()=> dispatch(operations.getData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskBox);