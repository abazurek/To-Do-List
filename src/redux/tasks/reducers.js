import types from "./types";

const initialState = {
    data: false,
    postData: false,
    putData: false,
    toDo: [],
    progress: [],
    done: []
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
                postData: action.data
            };
        case types.PUT_DATA:
            return {
                ...state,
                putData: action.data
            };
        case  types.PUSH_TODO:
            return {
                ...state,
                toDo: [...state, action.data]
            };
        case  types.PUSH_PROGRESS:
            return {
                ...state,
                progress: [...state, action.data]
            };
        case  types.PUSH_DONE:
            return {
                ...state,
                done: [...state, action.data]
            };

    }
}

export default tasksReducer