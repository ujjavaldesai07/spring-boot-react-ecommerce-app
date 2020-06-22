import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import authApiReducer from "./api/authApiReducer";
import mainScreenReducer from "./screens/mainScreenReducer";
import tabHoverEventReducer from "./events/tabHoverEventReducer";
import imageClickEventReducer from "./events/imageClickEventReducer";
import filterProductsReducer from "./screens/filter/filterProductsReducer";
import filterAttributesReducer from "./screens/filter/filterAttributesReducer";
import selectedFilterAttributesReducer from "./screens/filter/selectedFilterAttributesReducer";


export default combineReducers({
    form: formReducer,
    imageClickEventReducer,
    authApiReducer,
    mainScreenReducer,
    tabHoverEventReducer,
    filterProductsReducer,
    filterAttributesReducer,
    selectedFilterAttributesReducer,
});