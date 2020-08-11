import React,{useEffect} from "react";
import TaskBox from "./TaskBox";
import { connect } from 'react-redux';
import operations from "../redux/tasks/operations";


 function CenterSection({toDo, progress, done, data, getData}) {

     useEffect(function () {
         getData();
     },[]);

    return(
        <section className='center-section'>
            <div className='center-section-box'>
                <TaskBox title='Do zrobienia' count={3}/>
                <TaskBox title='W trakcie' count={2}/>
                <TaskBox title='Zrobione' count={1}/>
            </div>

        </section>
    )
}

const mapStateToProps = state => ({
    toDo: state.tasks.toDo,
    progress: state.tasks.progress,
    done: state.tasks.done,
    data: state.tasks.data

});
const mapDispatchToProps = dispatch => ({
    getData: ()=> dispatch(operations.getData())
});
export default connect(null, mapDispatchToProps)(CenterSection);