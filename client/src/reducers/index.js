import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import authApiReducer from "./api/authApiReducer";

import {
    homePageDataReducer, addToCartReducer,
    selectProductDetailReducer, checkoutProductReducer,
    filterProductsReducer, filterAttributesReducer,
    filterQueryReducer, tabsDataReducer,
    cartTotalReducer
} from "./screens/commonScreenReducer";

import {tabHoverEventReducer} from "./events/eventReducer";

import {
    selectedFilterAttributesReducer,
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
    selectSortReducer,
    selectPageReducer,
    selectProductDetailReducer,
    checkoutProductReducer,
    filterQueryReducer,
    selectedFilterAttributesReducer,
    tabsDataReducer,
    cartTotalReducer
});