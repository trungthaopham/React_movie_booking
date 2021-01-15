import { combineReducers } from "redux";
import { SliderReducer } from "./SliderReducer";
import { UserReducer } from "./UserReducer";
import { FilmReducer } from "./FilmReducer";

export const rootReducer = combineReducers({
    SliderReducer,
    UserReducer,
    FilmReducer,
})