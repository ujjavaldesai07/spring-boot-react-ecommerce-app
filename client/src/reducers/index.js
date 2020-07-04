import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import authApiReducer from "./api/authApiReducer";

import {
    homePageDataReducer, addToCartReducer,
    selectProductDetailReducer, checkoutProductReducer,
    filterProductsReducer, filterAttributesReducer,
} from "./screens/commonScreenReducer";

import {tabHoverEventReducer} from "./events/eventReducer";

import {
    selectGenderReducer, selectApparelReducer,
    selectBrandReducer, selectPriceReducer,
    selectSortReducer, selectPageReducer,
} from "./screens/filter/selectedFilterAttributesReducer"

export default combineReducers({
    form: formReducer,
    authApiReducer,
    homePageDataReducer,
    addToCartReducer,
    tabHoverEventReducer,
    filterProductsReducer,
    filterAttributesReducer,
    selectGenderReducer,
    selectApparelReducer,
    selectBrandReducer,
    selectPriceReducer,
    selectSortReducer,
    selectPageReducer,
    selectProductDetailReducer,
    checkoutProductReducer
});