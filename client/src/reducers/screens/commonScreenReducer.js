import {
    ADD_TO_CART,
    HANDLE_MAIN_SCREEN, LOAD_CHECKOUT_PRODUCTS,
    LOAD_FILTER_ATTRIBUTES,
    LOAD_FILTER_PRODUCTS,
    SELECT_PRODUCT_DETAIL
} from "../../actions/types";
import log from "loglevel";

export const homePageDataReducer =  (state = null, action) => {
    log.trace(`[HOME_SCREEN_REDUCER]: action.type = ${action.type}`)
    switch (action.type) {
        case HANDLE_MAIN_SCREEN:
            log.trace(`[HOME_SCREEN_REDUCER]: action.payload = ${JSON.stringify(action.payload)}`)
            return action.payload;
        default:
            return state;
    }
};

export const addToCartReducer =  (state = null, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return action.payload;
        default:
            return state;
    }
};

export const filterProductsReducer =  (state = null, action) => {
    switch (action.type) {
        case LOAD_FILTER_PRODUCTS:
            return action.payload;
        default:
            return state;
    }
};

export const filterAttributesReducer = (state = null, action) => {
    switch (action.type) {
        case LOAD_FILTER_ATTRIBUTES:
            // log.trace(`[FILTER_ATTRIBUTES_REDUCER]: action.payload = ${JSON.stringify(action.payload)}`)
            return action.payload;
        default:
            return state;
    }
};

export const selectProductDetailReducer = (state = null, action) => {
    switch (action.type) {
        case SELECT_PRODUCT_DETAIL:
            return action.payload
        default:
            return state;
    }
};

export const checkoutProductReducer = (state = null, action) => {
    switch (action.type) {
        case LOAD_CHECKOUT_PRODUCTS:
            return action.payload
        default:
            return state;
    }
};