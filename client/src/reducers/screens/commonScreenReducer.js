import {
    ADD_TO_CART,
    LOAD_HOME_PAGE,
    LOAD_SHOPPING_BAG_PRODUCTS,
    LOAD_FILTER_ATTRIBUTES,
    LOAD_FILTER_PRODUCTS,
    LOAD_TABS_DATA,
    REMOVE_FILTER_ATTRIBUTES,
    SAVE_QUERY_STATUS,
    SELECT_PRODUCT_DETAIL,
    CART_TOTAL,
    SAVE_SORT_LIST,
    SHIPPING_ADDRESS_CONFIRMED,
    PAYMENT_INFO_CONFIRMED,
    SHIPPING_OPTION_CONFIRMED,
    PAYMENT_RESPONSE,
    DELIVERY_CHARGES,
    HANDLE_SIGN_IN,
    HANDLE_SIGN_IN_ERROR,
    HANDLE_GOOGLE_AUTH_SIGN_IN,
    HANDLE_GOOGLE_AUTH_SIGN_OUT,
    HANDLE_SIGN_OUT,
    HANDLE_SIGN_UP_ERROR,
    RESET_SIGN_UP,
    SET_GOOGLE_AUTH,
    RESET_SIGN_IN_ERROR,
    RESET_PAYMENT_RESPONSE_ERROR,
    PAYMENT_RESPONSE_ERROR,
    RESET_PAYMENT_RESPONSE,
    RESET_SHIPPING_ADDRESS,
    RESET_SHIPPING_OPTION,
    RESET_DELIVERY_CHARGES,
    RESET_CART_TOTAL,
    RESET_ADD_TO_CART, RESET_SHOPPING_BAG_PRODUCTS, SEARCH_KEYWORD, SEARCH_KEYWORD_ERROR, RESET_QUERY_STATUS
} from "../../actions/types";
import log from "loglevel";
import {
    INITIAL_SHIPPING_ADDRESS_STATE,
    INITIAL_SHIPPING_OPTION_STATE
} from "../../constants/constants";
import _ from "lodash";


export const signInReducer = (state
                                  = {isSignedIn: null, timestamp: null, firstName: null}, action) => {

    // timestamp is used to update the state so that
    // we can stop loading progress component
    switch (action.type) {
        case HANDLE_SIGN_IN:
            return {
                ...state, isSignedIn: true, tokenId: action.payload.jwt, errorMsg: null,
                firstName: action.payload.firstName, timestamp: Date.now()
            };
        case HANDLE_SIGN_IN_ERROR:
            return {...state, isSignedIn: false, errorMsg: action.payload, timestamp: Date.now()};
        case RESET_SIGN_IN_ERROR:
            return {...state, errorMsg: null};
        case HANDLE_SIGN_OUT:
            _.omit(state, 'tokenId', 'errorMsg')
            return {...state, isSignedIn: false, firstName: null};
        default:
            return state;
    }
};

export const googleAuthReducer = (state
                                      = {isSignedInUsingOAuth: null, firstName: null, oAuth: null}, action) => {
    switch (action.type) {
        case SET_GOOGLE_AUTH:
            return {
                ...state,
                isSignedInUsingOAuth: action.payload.oAuth.isSignedIn.get(),
                firstName: action.payload.firstName,
                oAuth: action.payload.oAuth
            };
        case HANDLE_GOOGLE_AUTH_SIGN_IN:
            return {
                ...state, isSignedInUsingOAuth: true,
                firstName: action.payload.firstName,
                oAuth: action.payload.oAuth
            };
        case HANDLE_GOOGLE_AUTH_SIGN_OUT:
            return {...state, isSignedInUsingOAuth: false, firstName: null};
        default:
            return state;
    }
};

export const signUpReducer = (state
                                  = {errorMsg: null, timestamp: null}, action) => {
    // timestamp is used to update the state so that
    // we can stop loading progress component
    switch (action.type) {
        case HANDLE_SIGN_UP_ERROR:
            return {...state, errorMsg: action.payload, timestamp: Date.now()};
        case RESET_SIGN_UP:
            return {account_status: null, errorMsg: null}
        default:
            return state;
    }
};

export const homePageDataReducer = (state = {isLoading: true}, action) => {
    log.trace(`[HOME_SCREEN_REDUCER]: action.type = ${action.type}`)
    switch (action.type) {
        case LOAD_HOME_PAGE:
            log.trace(`[HOME_SCREEN_REDUCER]: action.payload = ${JSON.stringify(action.payload)}`)
            return action.payload;
        default:
            return state;
    }
};

export const tabsDataReducer = (state = {isLoading: true}, action) => {
    switch (action.type) {
        case LOAD_TABS_DATA:
            return action.payload;
        default:
            return state;
    }
};

export const addToCartReducer = (state
                                     = {totalQuantity: 0, productQty: {}}, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state, totalQuantity: action.payload.totalQuantity,
                productQty: action.payload.productQty
            };
        case RESET_ADD_TO_CART:
            return {totalQuantity: 0, productQty: {}}
        default:
            return state;
    }
};

export const filterProductsReducer = (state = {isLoading: true}, action) => {
    switch (action.type) {
        case LOAD_FILTER_PRODUCTS:
            return action.payload;
        default:
            return state;
    }
};

export const filterAttributesReducer = (state = {isLoading: true}, action) => {
    switch (action.type) {
        case LOAD_FILTER_ATTRIBUTES:
            return action.payload;
        case REMOVE_FILTER_ATTRIBUTES:
            return null
        default:
            return state;
    }
};

export const selectProductDetailReducer = (state = {isLoading: true}, action) => {
    switch (action.type) {
        case SELECT_PRODUCT_DETAIL:
            return action.payload
        default:
            return state;
    }
};

export const shoppingBagProductReducer = (state = {isLoading: true}, action) => {
    switch (action.type) {
        case LOAD_SHOPPING_BAG_PRODUCTS:
            return action.payload
        case RESET_SHOPPING_BAG_PRODUCTS:
            return {isLoading: false, data: {}}
        default:
            return state;
    }
};

export const filterQueryReducer = (state = null, action) => {
    switch (action.type) {
        case SAVE_QUERY_STATUS:
            return action.payload
        case RESET_QUERY_STATUS:
            return null
        default:
            return state;
    }
};

export const cartTotalReducer = (state = 0, action) => {
    switch (action.type) {
        case CART_TOTAL:
            return action.payload
        case RESET_CART_TOTAL:
            return 0
        default:
            return state;
    }
};

export const deliveryChargesReducer = (state = 0, action) => {
    switch (action.type) {
        case DELIVERY_CHARGES:
            return action.payload
        case RESET_DELIVERY_CHARGES:
            return 0
        default:
            return state;
    }
};

export const savedSortedListReducer = (state = null, action) => {
    switch (action.type) {
        case SAVE_SORT_LIST:
            return action.payload
        default:
            return state;
    }
};

export const shippingAddressReducer = (state
                                           = INITIAL_SHIPPING_ADDRESS_STATE, action) => {
    switch (action.type) {
        case SHIPPING_ADDRESS_CONFIRMED:
            return action.payload
        case RESET_SHIPPING_ADDRESS:
            return INITIAL_SHIPPING_ADDRESS_STATE
        default:
            return state;
    }
};

export const paymentInfoReducer = (state = {values: null, submitted: false}, action) => {
    switch (action.type) {
        case PAYMENT_INFO_CONFIRMED:
            return action.payload
        default:
            return state;
    }
};

export const shippingOptionReducer = (state = INITIAL_SHIPPING_OPTION_STATE, action) => {
    switch (action.type) {
        case SHIPPING_OPTION_CONFIRMED:
            return action.payload
        case RESET_SHIPPING_OPTION:
            return INITIAL_SHIPPING_OPTION_STATE
        default:
            return state;
    }
};

export const paymentResponseReducer = (state
                                           = {error: false, errorMsg: null, timestamp: null}, action) => {
    switch (action.type) {
        case PAYMENT_RESPONSE:
            return action.payload
        case PAYMENT_RESPONSE_ERROR:
            return {...state, error: true, errorMsg: action.payload.errorMsg, timestamp: Date.now()};
        case RESET_PAYMENT_RESPONSE_ERROR:
            return {...state, error: false, errorMsg: null, timestamp: null}
        case RESET_PAYMENT_RESPONSE:
            return {error: false, errorMsg: null, timestamp: null}
        default:
            return state;
    }
};

export const searchKeywordReducer = (state
                                           = {error: false, errorMsg: null, data: [{keyword: ' '}]}, action) => {
    switch (action.type) {
        case SEARCH_KEYWORD:
            return {...action.payload, error: false, errorMsg: null}
        case SEARCH_KEYWORD_ERROR:
            return {...state, error: true, errorMsg: "Something went wrong"};
        default:
            return state;
    }
};