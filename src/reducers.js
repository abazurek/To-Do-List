import {combineReducers} from "redux";
import tasksReducer from "./redux/tasks";

const rootReducer = combineReducers({
    task: tasksReducer
});



export default rootReducer