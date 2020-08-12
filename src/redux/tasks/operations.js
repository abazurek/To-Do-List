import actions from "./actions";

const API = "http://localhost:3001/tasks";



const getData = () => dispatch => {
    const toDo=[];
    const progress=[];
    const done=[];
    fetch(API)
        .then(data => data.json())
        .then(data => {
            dispatch(actions.getData(data));
            data.forEach(item => {
                if (item.category === "Do zrobienia") {
                    toDo.push(item)
                } else if (item.category === "W trakcie") {
                   progress.push(item)
                } else if (item.category === "Zrobione") {
                  done.push(item)
                }
            });
            dispatch(actions.pushToDo(toDo));
            dispatch(actions.pushProgress(progress));
            dispatch(actions.pushDone(done))
        })
        .catch(err => console.log(err));

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

const putData = (id,data) => () => {
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