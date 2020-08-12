import actions from "./actions";

const API = "http://localhost:3001/tasks";

const getData = () => dispatch => {
    fetch(API)
        .then(data => data.json())
        .then(data => {
            dispatch(actions.getData(data));
            data.forEach(item => {
                if (item.category === "Do zrobienia") {
                    dispatch(actions.pushToDo(item))
                } else if (item.category === "W trakcie") {
                    dispatch(actions.pushProgress(item))
                } else if (item.category === "Zrobione") {
                    dispatch(actions.pushDone(item))
                }
            });
        })


        .catch(err => console.log(err))
};

const postData = (data) => () => {
    fetch(API, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(resp => resp.json())
        .then(data=>console.log(data))
        .catch(err => console.log(err))
};

const putData = ({id, data}) => () => {
    fetch(`${API}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(resp => resp.json())
        .catch(err => console.log(err))

};

export default {getData, postData, putData}