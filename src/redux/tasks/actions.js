import types from "./types";

const getData = data => ({type: types.GET_DATA, data});
const postData = data => ({type: types.POST_DATA, data});
const putData = data => ({type: types.PUT_DATA, data});
const pushToDo = data =>({type: types.PUSH_TODO, data});
const pushProgress = data =>({type: types.PUSH_PROGRESS, data});
const pushDone = data =>({type: types.PUSH_DONE, data});


export default {
    getData,
    postData,
    putData,
    pushToDo,
    pushProgress,
    pushDone,

}