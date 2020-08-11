import actions from "./actions";

const API="http://localhost:3001/tasks";

const getData = () => dispatch =>{
    fetch(API)
        .then(data=>data.json())
        .then(data=>dispatch(actions.getData(data)))
        .then(arr=>arr.forEach(item=>{
            if(item.category==="ToDo"){
                dispatch(actions.pushToDo( item.message))
            } else if(item.category ==="Progress"){
                dispatch(actions.pushProgress(item))
            } else if(item.category === "Done"){
                dispatch(actions.pushDone(item))
            }

        }))
        .catch(err=>console.log(err))
};

const postData = (data) => dispatch => {
    fetch(API, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(resp=>resp.json())
        .then(data=>dispatch.actions.postData(data))
        .catch(err=>console.log(err))
};

const putData = ({id,data}) => dispatch => {
    fetch(`${API}/${id}`, {
        method:"PATCH",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    })
        .then(resp=>resp.json())
        .catch(err=>console.log(err))

};

export default {getData, postData, putData}