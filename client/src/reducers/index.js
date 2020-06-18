import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import authApiReducer from "./api/authApiReducer";
import mainScreenReducer from "./screens/mainScreenReducer";
import tabHoverEventReducer from "./events/tabHoverEventReducer";
import imageClickEventReducer from "./events/imageClickEventReducer";
import filterScreenReducer from "./screens/filterScreenReducer";

export default combineReducers({
    form: formReducer,
    imageClickEventReducer,
    authApiReducer,
    mainScreenReducer,
    tabHoverEventReducer,
    filterScreenReducer
});