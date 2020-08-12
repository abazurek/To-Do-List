import types from "./types";

const initialState = {
    data: false,
    post: false,
    putData: false,
    toDo: [],
    progress: [],
    done: [],
    deleted:false
};
function tasksReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_DATA:
            return {
                ...state,
                data: action.data,
            };
        case types.POST_DATA:
            return {
                ...state,
                post: action.data
            };
        case types.PUT_DATA:
            return {
                ...state,
                putData: action.data
            };
        case  types.PUSH_TODO:
            return {
                ...state,
                toDo: action.data
            };
        case  types.PUSH_PROGRESS:
            return {
                ...state,
                progress:  action.data
            };
        case  types.PUSH_DONE:
            return {
                ...state,
                done: action.data
            };
            case  types.DELETE_TASK:
            return {
                ...state,
                deleted: action.data
            };
        default:
            return state

    }
}

export default tasksReducer