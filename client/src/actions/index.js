import {
    HANDLE_SIGN_IN,
    HANDLE_SIGN_UP,
    HANDLE_SIGN_UP_ERROR,
    HANDLE_SIGN_OUT,
    HANDLE_TOKEN_ID,
    HANDLE_SIGN_IN_ERROR,
    LOAD_FILTER_PRODUCTS,
    LOAD_FILTER_ATTRIBUTES,
    INTERNAL_SERVER_ERROR_CODE,
    BAD_REQUEST_ERROR_CODE,
} from './types';
import authApi from "../api/authServiceApi";
import history from "../history";
import {Base64} from 'js-base64';
import Cookies from 'js-cookie';
import commonServiceApi from "../api/commonServiceApi";
import log from "loglevel";

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
    authApi.defaults.timeout = 15000;
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

export const getDataViaAPI = (type, uri) => async dispatch => {
    log.info(`[ACTION]: invokeAndDispatchAPIData Calling API = ${uri}.`)

    if(uri) {
        commonServiceApi.defaults.timeout = 15000;
        uri = uri.replace(/\s/g, '')
        let responseError = false
        const response = await commonServiceApi.get(uri)
            .catch(err => {
                log.info(`[ACTION]: unable to fetch response for API = ${uri}`)
                dispatch({type: type, payload: {isLoading: false, statusCode: INTERNAL_SERVER_ERROR_CODE}});
                responseError = true
            });

        if (responseError) {
            return
        }

        if (response != null) {
            log.debug(`[ACTION]: Data = ${JSON.parse(JSON.stringify(response.data))}.`)
            dispatch({
                type: type, payload:
                    {isLoading: false, data: JSON.parse(JSON.stringify(response.data))}
            });
            if(LOAD_FILTER_PRODUCTS.localeCompare(type) === 0) {
                window.history.pushState('', '', uri)
            }
        } else {
            dispatch({type: type, payload: {isLoading: false, statusCode: BAD_REQUEST_ERROR_CODE}});
        }
    }
}

export const loadFilterAttributes = filterQuery => async dispatch => {
    log.info(`[ACTION]: loadFilterAttributes Calling Filter API filterQuery = ${filterQuery}`)

    if (filterQuery) {
        let uri = `/filter${filterQuery.replace(/\s/g, '')}`
        const response = await commonServiceApi.get(uri);
        if (response != null) {
            log.trace(`[ACTION]: Filter = ${JSON.stringify(response.data)}`)
            dispatch({type: LOAD_FILTER_ATTRIBUTES, payload: JSON.parse(JSON.stringify(response.data))});
            return JSON.parse(JSON.stringify(response.data))
        } else {
            log.info(`[ACTION]: unable to fetch response for Filter API`)
        }
    }
};