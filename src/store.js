import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import reducer from './reducers'
import {logger} from "redux-logger";
import {composeWithDevTools} from "redux-devtools-extension";

const middleWare = [thunk, logger];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleWare))
);

export default store