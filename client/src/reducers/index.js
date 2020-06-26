import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import authApiReducer from "./api/authApiReducer";
import mainScreenReducer from "./screens/mainScreenReducer";
import tabHoverEventReducer from "./events/tabHoverEventReducer";
import filterProductsReducer from "./screens/filter/filterProductsReducer";
import filterAttributesReducer from "./screens/filter/filterAttributesReducer";
import {
    selectGenderReducer, selectApparelReducer,
    selectBrandReducer, selectPriceReducer,
    selectSortReducer
} from "./screens/filter/selectedFilterAttributesReducer"


export default combineReducers({
    form: formReducer,
    authApiReducer,
    mainScreenReducer,
    tabHoverEventReducer,
    filterProductsReducer,
    filterAttributesReducer,
    selectGenderReducer,
    selectApparelReducer,
    selectBrandReducer,
    selectPriceReducer,
    selectSortReducer
});