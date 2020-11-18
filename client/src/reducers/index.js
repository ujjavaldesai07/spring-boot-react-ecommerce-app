import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";

import {
    homePageDataReducer, addToCartReducer,
    selectProductDetailReducer, shoppingBagProductReducer,
    filterProductsReducer, filterAttributesReducer,
    filterQueryReducer, tabsDataReducer,
    cartTotalReducer, savedSortedListReducer,
    shippingAddressReducer, paymentInfoReducer,
    shippingOptionReducer, deliveryChargesReducer,
    paymentResponseReducer, signInReducer, signUpReducer,
    googleAuthReducer, searchKeywordReducer
} from "./screens/commonScreenReducer";

import {tabHoverEventReducer} from "./events/eventReducer";

import {
    selectedFilterAttributesReducer,
    selectSortReducer, selectPageReducer, clearFiltersReducer
} from "./screens/filter/selectedFilterAttributesReducer"

export default combineReducers({
    form: formReducer,
    signInReducer,
    signUpReducer,
    homePageDataReducer,
    addToCartReducer,
    tabHoverEventReducer,
    filterProductsReducer,
    filterAttributesReducer,
    selectSortReducer,
    selectPageReducer,
    selectProductDetailReducer,
    shoppingBagProductReducer,
    filterQueryReducer,
    selectedFilterAttributesReducer,
    tabsDataReducer,
    cartTotalReducer,
    savedSortedListReducer,
    shippingAddressReducer,
    paymentInfoReducer,
    shippingOptionReducer,
    deliveryChargesReducer,
    paymentResponseReducer,
    googleAuthReducer,
    searchKeywordReducer,
    clearFiltersReducer
});