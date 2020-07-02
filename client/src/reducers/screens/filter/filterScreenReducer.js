import {LOAD_FILTER_ATTRIBUTES, LOAD_FILTER_PRODUCTS} from "../../../actions/types";
import log from "loglevel";

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