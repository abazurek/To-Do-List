import React,{useEffect} from "react";
import TaskBox from "./TaskBox";
import { connect } from 'react-redux';
import operations from "../redux/tasks/operations";



 function CenterSection({toDo, progress, done, data,putData,post,deleted, getData}) {

     useEffect(function () {
         getData();
     },[putData,post, deleted]);

    return(
        <div className='center-section'>
            <div className='center-section-box'>
                {data? <>
                    <TaskBox title='Do zrobienia' count={toDo.length}/>
                    <TaskBox title='W trakcie' count={progress.length}/>
                    <TaskBox title='Zrobione' count={done.length}/>
                </>:<span>Oczekiwanie na dane..</span>}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    toDo: state.task.toDo,
    progress: state.task.progress,
    done: state.task.done,
    data: state.task.data,
    putData: state.task.putData,
    post: state.task.post,
    deleted: state.task.deleted
});
const mapDispatchToProps = dispatch => ({
    getData: ()=> dispatch(operations.getData())
});
export default connect(mapStateToProps, mapDispatchToProps)(CenterSection);