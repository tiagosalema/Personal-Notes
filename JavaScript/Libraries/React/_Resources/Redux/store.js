import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; // Redux middleware designed to handle with asynchronous calls
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // to use the browser extension
  )
);

export default store;
