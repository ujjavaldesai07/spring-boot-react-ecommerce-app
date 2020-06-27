import {
    HANDLE_SIGN_IN,
    HANDLE_SIGN_UP,
    HANDLE_SIGN_UP_ERROR,
    HANDLE_MAIN_SCREEN,
    HANDLE_SIGN_OUT,
    HANDLE_TOKEN_ID,
    HANDLE_SIGN_IN_ERROR,
    LOAD_FILTER_PRODUCTS,
    LOAD_FILTER_ATTRIBUTES,
    ADD_APPAREL_CATEGORY,
    ADD_PRICE_CATEGORY,
    ADD_BRAND_CATEGORY,
    ADD_GENDER_CATEGORY,
    SELECT_SORT_CATEGORY,
} from './types';
import authApi from "../api/authServiceApi";
import history from "../history";
import {Base64} from 'js-base64';
import Cookies from 'js-cookie';
import commonServiceApi from "../api/commonServiceApi";
import log from "loglevel";
import {PRODUCT_ROUTE} from "../constants/constants";

export const setTokenFromCookie = tokenId => {
    log.info(`[ACTION]: setTokenFromCookie tokenId = ${tokenId}`)
    return {
        type: HANDLE_SIGN_IN,
        payload: tokenId
    }
}

export const signIn = formValues => async (dispatch) => {
    log.info(`[ACTION]: signIn API is invoked formValues = ${formValues}`)

    const hash = Base64.encode(`${formValues.Username}:${formValues.Password}`);
    authApi.defaults.headers.common['Authorization'] = `Basic ${hash}`
    authApi.defaults.timeout = 5000;
    const response = await authApi.post('/authenticate').catch(err => {
        log.info(`[ACTION]: dispatch HANDLE_SIGN_IN_ERROR err.message = ${err.message}`)
        dispatch({type: HANDLE_SIGN_IN_ERROR, payload: err.message});
    });

    if (response) {
        if (response.data.jwt) {
            log.info(`[ACTION]: dispatch HANDLE_SIGN_IN response.data.jwt = ${response.data.jwt}`)
            dispatch({type: HANDLE_SIGN_IN, payload: response.data.jwt});
            Cookies.set(HANDLE_TOKEN_ID, response.data.jwt, {expires: 7});
            history.push('/');
        } else {
            log.info(`[ACTION]: dispatch HANDLE_SIGN_IN_ERROR response.data.error = ${response.data.error}`)
            dispatch({type: HANDLE_SIGN_IN_ERROR, payload: response.data.error});
        }
    }
}

export const signOut = () => {
    log.info(`[ACTION]: signOut Cookie is removed...`)
    Cookies.remove(HANDLE_TOKEN_ID)
    return {
        type: HANDLE_SIGN_OUT
    }
}

export const signUp = formValues => async (dispatch) => {
    log.info(`[ACTION]: signUp API = ${JSON.stringify(formValues)}.`)
    authApi.defaults.timeout = 5000;
    const response = await authApi.post('/signup', {
        'username': formValues.Username,
        'password': formValues.Password,
        'firstname': formValues.FirstName,
        'lastname': formValues.LastName,
        'email': formValues.Email.toLowerCase(),
    }).catch(err => {
        log.info(`[ACTION]: signUp dispatch HANDLE_SIGN_UP_ERROR err.message = ${err.message}.`)
        dispatch({type: HANDLE_SIGN_UP_ERROR, payload: err.message});
    });

    if (response) {
        if (response.data.account_creation_status === 'success') {
            log.info(`[ACTION]: dispatch HANDLE_SIGN_UP account_creation_status = ${response.data.account_creation_status}.`)
            dispatch({type: HANDLE_SIGN_UP, payload: response.data.account_creation_status});

        } else {
            console.log('response.data.error_msg = ' + response.data.error_msg);
            log.info(`[ACTION]: dispatch HANDLE_SIGN_UP_ERROR response.data.error_msg = ${response.data.error_msg}.`)
            dispatch({type: HANDLE_SIGN_UP_ERROR, payload: response.data.error_msg});
        }
    }
}

export const loadHomePage = () => async dispatch => {
    log.info(`[ACTION]: loadMainScreen API.`)
    const response = await commonServiceApi.get('/home');

    if (response != null) {
        log.debug(`[ACTION]: loadMainScreen API = ${JSON.parse(JSON.stringify(response.data))}.`)
        dispatch({type: HANDLE_MAIN_SCREEN, payload: JSON.parse(JSON.stringify(response.data))});
    }
};

export const loadProducts = filterQuery => async dispatch => {
    log.info(`[ACTION]: loadFilterProducts Calling Products API filterQuery = ${filterQuery}`)

    if (filterQuery) {
        const response = await commonServiceApi.get(`/products?q=${filterQuery}`);
        if (response != null) {
            log.trace(`[ACTION]: Products = ${JSON.stringify(response.data)}`)
            dispatch({type: LOAD_FILTER_PRODUCTS, payload: JSON.parse(JSON.stringify(response.data))});
            history.push('/products?q=' + filterQuery);
        } else {
            log.info(`[ACTION]: unable to fetch response for Products API`)
        }

    }
};

export const loadFilterAttributes = () => async dispatch => {
    log.info(`[ACTION]: loadFilterAttributes Calling Filter API`)
    const response = await commonServiceApi.get('/filter');
    if (response != null) {
        log.trace(`[ACTION]: Filter = ${JSON.stringify(response.data)}`)
        dispatch({type: LOAD_FILTER_ATTRIBUTES, payload: JSON.parse(JSON.stringify(response.data))});

        if (history.location && history.location.pathname.localeCompare(PRODUCT_ROUTE) === 0) {
            let filterAttributes = response.data

            const attrInfoList = [
                {
                    type: ADD_GENDER_CATEGORY,
                    attrStr: "gender",
                    attrList: filterAttributes.genders
                },
                {
                    type: ADD_APPAREL_CATEGORY,
                    attrStr: "apparel",
                    attrList: filterAttributes.apparels
                },
                {
                    type: ADD_BRAND_CATEGORY,
                    attrStr: "brand",
                    attrList: filterAttributes.brands
                },
                {
                    type: SELECT_SORT_CATEGORY,
                    attrStr: "sortby",
                    attrList: filterAttributes.sorts
                },

            ]

            attrInfoList.forEach(({type, attrStr, attrList}) => {
                setFilterAttributesFromURL(dispatch, filterAttributes, type, attrStr, attrList)
            })
        }
    } else {
        log.info(`[ACTION]: unable to fetch response for Filter API`)
    }
};

const setFilterAttributesFromURL = (dispatch, filterAttributes, actionType, attrString, attrList) => {

    const getObjectFromList = (id, list) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === parseInt(id))
                return list[i]
        }
        return null
    }

    let params = history.location.search
    let attrParams = params.split(`${attrString}=`)

    if (attrParams.length === 1) {
        return
    }

    let values
    let selectedAttrList = []

    // 0th index consist of "?q=" which we are not interest
    // actual data starts from pIndex=1
    for (let pIndex = 1; pIndex < attrParams.length; ++pIndex) {
        try {
            values = attrParams[pIndex].split("::")[0].split(",")
        } catch (e) {
            log.error("Corrupted URL. Unable to decode url field")
        }

        if (values.length > 0) {
            values.forEach(id => {
                let attrObject = getObjectFromList(id, attrList)
                if (attrObject) {
                    selectedAttrList.push({
                        id: attrObject.id,
                        value: attrObject.type
                    })
                }
            })
        }
    }

    dispatch({
        type: actionType,
        payload: {
            attrList: selectedAttrList
        }
    })

}