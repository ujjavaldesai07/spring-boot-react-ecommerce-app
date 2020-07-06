import {
    ADD_TO_CART, DELETE_FILTER_QUERY,
    HANDLE_MAIN_SCREEN, LOAD_CHECKOUT_PRODUCTS,
    LOAD_FILTER_ATTRIBUTES,
    LOAD_FILTER_PRODUCTS, REMOVE_FILTER_ATTRIBUTES, SAVE_FILTER_QUERY,
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
            return action.payload;
        case REMOVE_FILTER_ATTRIBUTES:
            return null
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

export const filterQueryReducer = (state = null, action) => {
    switch (action.type) {
        case SAVE_FILTER_QUERY:
            return action.payload
        case DELETE_FILTER_QUERY:
            return null
        default:
            return state;
    }
};