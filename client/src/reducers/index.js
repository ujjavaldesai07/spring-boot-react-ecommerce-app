import {combineReducers} from "redux";
import tabReducer from "./tabReducer";
import {reducer as formReducer} from "redux-form";
import authReducer from "./authReducer";

export default combineReducers({
    form: formReducer,
    tab: tabReducer,
    authenticate: authReducer
});