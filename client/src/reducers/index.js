import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import authApiReducer from "./api/authApiReducer";
import homeScreenReducer from "./screens/homeScreenReducer";
import tabHoverEventReducer from "./events/tabHoverEventReducer";
import filterProductsReducer from "./screens/filter/filterProductsReducer";
import filterAttributesReducer from "./screens/filter/filterAttributesReducer";
import {
    selectGenderReducer, selectApparelReducer,
    selectBrandReducer, selectPriceReducer,
    selectSortReducer, selectPageReducer
} from "./screens/filter/selectedFilterAttributesReducer"


export default combineReducers({
    form: formReducer,
    authApiReducer,
    homeScreenReducer,
    tabHoverEventReducer,
    filterProductsReducer,
    filterAttributesReducer,
    selectGenderReducer,
    selectApparelReducer,
    selectBrandReducer,
    selectPriceReducer,
    selectSortReducer,
    selectPageReducer
});