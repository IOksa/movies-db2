import {combineReducers} from "redux";
import moviesReducer from "./movies";

const RootReducer=combineReducers({
    movies: moviesReducer

    }
);

export default RootReducer;