import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import authApiReducer from "./api/authApiReducer";
import homeScreenReducer from "./screens/homeScreenReducer";
import {tabHoverEventReducer} from "./events/eventReducer";
import {filterProductsReducer, filterAttributesReducer} from "./screens/filter/filterScreenReducer";
import {
    selectGenderReducer, selectApparelReducer,
    selectBrandReducer, selectPriceReducer,
    selectSortReducer, selectPageReducer, selectProductReducer
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
    selectPageReducer,
    selectProductReducer
});