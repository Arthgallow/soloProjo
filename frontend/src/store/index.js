import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"
import sessionReducer from "./session";
import groupReducer from "./groupsSession";
import commentReducer from "./commentSession"
import userReducer from "./user";





const rootReducer = combineReducers({
    session: sessionReducer,
    group: groupReducer,
    comment: commentReducer,
    users: userReducer,
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}
const configureStore = (preLoadedState)=>{
    return createStore(rootReducer, preLoadedState, enhancer);
}

export default configureStore;
