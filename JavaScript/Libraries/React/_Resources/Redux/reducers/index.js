import { combineReducers } from "redux";
import postReducer from "./postReducer";

// the state held in the Redux store will be a single object containing, in this case, the posts property
export default combineReducers({
  posts: postReducer
});
