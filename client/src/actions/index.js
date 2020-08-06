import {
    HANDLE_SIGN_IN,
    HANDLE_SIGN_UP_ERROR,
    HANDLE_SIGN_OUT,
    HANDLE_SIGN_IN_ERROR,
    LOAD_FILTER_PRODUCTS,
    LOAD_FILTER_ATTRIBUTES,
    SAVE_QUERY_STATUS,
    SHIPPING_ADDRESS_CONFIRMED,
    PAYMENT_INFO_CONFIRMED,
    PAYMENT_RESPONSE, CART_TOTAL, HANDLE_SIGN_UP_RESET, HANDLE_GOOGLE_AUTH_SIGN_IN, HANDLE_GOOGLE_AUTH_SIGN_OUT,
} from './types';
import {INTERNAL_SERVER_ERROR_CODE, BAD_REQUEST_ERROR_CODE} from '../constants/http_error_codes'
import {SHOPPERS_PRODUCT_INFO_COOKIE, CART_TOTAL_COOKIE, AUTH_DETAILS_COOKIE} from '../constants/cookies'
import history from "../history";
import {Base64} from 'js-base64';
import Cookies from 'js-cookie';
import log from "loglevel";
import {commonServiceAPI, authServiceAPI} from "../api/service_api";
import axios from 'axios';

export const setAuthDetailsFromCookie = savedResponse => {
    log.info(`[ACTION]: setTokenFromCookie savedResponse = ${savedResponse}`)
    return {
        type: HANDLE_SIGN_IN,
        payload: savedResponse
    }
}

export const setShippingAddress = payload => {
    log.info(`[ACTION]: setShippingAddress payload = ${JSON.stringify(payload)}`)
    return {
        type: SHIPPING_ADDRESS_CONFIRMED,
        payload: payload
    }
}

export const setPaymentInfo = payload => {
    log.info(`[ACTION]: setPaymentInfo payload = ${JSON.stringify(payload)}`)
    return {
        type: PAYMENT_INFO_CONFIRMED,
        payload: payload
    }
}

export const signIn = formValues => async dispatch => {
    log.info(`[ACTION]: signIn API is invoked formValues = ${formValues}`)

    const hash = Base64.encode(`${formValues.username}:${formValues.password}`);
    authServiceAPI.defaults.headers.common['Authorization'] = `Basic ${hash}`
    authServiceAPI.defaults.timeout = 5000;
    const response = await authServiceAPI.post('/authenticate').catch(err => {
        log.info(`[ACTION]: dispatch HANDLE_SIGN_IN_ERROR err.message = ${err.message}`)
        dispatch({type: HANDLE_SIGN_IN_ERROR, payload: err.message});
    });

    if (response) {
        if (response.data.jwt) {
            log.info(`[ACTION]: dispatch HANDLE_SIGN_IN response.data.jwt = ${response.data.jwt}`)
            dispatch({type: HANDLE_SIGN_IN, payload: response.data});
            Cookies.set(AUTH_DETAILS_COOKIE, response.data, {expires: 2});
            history.push('/');
        } else {
            log.info(`[ACTION]: dispatch HANDLE_SIGN_IN_ERROR response.data.error = ${response.data.error}`)
            dispatch({type: HANDLE_SIGN_IN_ERROR, payload: response.data.error});
        }
    }
}

export const signOut = () => {
    log.info(`[ACTION]: signOut Cookie is removed...`)
    Cookies.remove(AUTH_DETAILS_COOKIE)
    return {
        type: HANDLE_SIGN_OUT
    }
}

export const signInUsingOAuth = googleAuth => async dispatch => {
    log.info(`[signInUsingOAuth] googleAuth = ${googleAuth}`)

    // check if not signed in
    if (googleAuth && !googleAuth.isSignedIn.get()) {
        log.info('[signInUsingOAuth] User has not signed in yet')

        // sign in
        googleAuth.signIn(JSON.parse(googleAuth.currentUser.get().getId())).then(() => {
            // if sign in works
            if (googleAuth.isSignedIn.get()) {
                log.info('[signInUsingOAuth] User is signed in successfully')
                // here we are sure that we signed in and now dispatch.
                dispatch({
                    type: HANDLE_GOOGLE_AUTH_SIGN_IN,
                    payload: {
                        firstName: "Norman",
                        oAuth: googleAuth
                    }
                })

                history.push("/");
            }
        })
    }
}

export const signOutUsingOAuth = googleAuth => async dispatch => {
    log.info(`[signOutUsingOAuth] googleAuth = ${googleAuth}, ` +
        `googleAuth.isSignedIn.get() = ${googleAuth.isSignedIn.get()}`)

    // if signed in then only try to sign out
    if (googleAuth && googleAuth.isSignedIn.get()) {

        log.info(`[signOutUsingOAuth] trying to signout`)
        googleAuth.signOut().then(() => {
            if (!googleAuth.isSignedIn.get()) {
                log.info(`[signOutUsingOAuth] Successfully signed out`)
                dispatch({
                    type: HANDLE_GOOGLE_AUTH_SIGN_OUT,
                    payload: null
                })
            }
        });
    }
}


export const resetSignUp = () => {
    return {
        type: HANDLE_SIGN_UP_RESET
    }
}

export const signUp = formValues => async dispatch => {
    log.info(`[ACTION]: signUp API = ${JSON.stringify(formValues)}.`)

    authServiceAPI.defaults.timeout = 15000;
    const response = await authServiceAPI.post('/signup', {
        'username': formValues.username,
        'password': formValues.password,
        'firstname': formValues.firstName,
        'lastname': formValues.lastName,
        'email': formValues.email.toLowerCase(),
    }).catch(err => {
        log.info(`[ACTION]: signUp dispatch HANDLE_SIGN_UP_ERROR err.message = ${err.message}.`)
        dispatch({type: HANDLE_SIGN_UP_ERROR, payload: err.message});
    });

    if (response) {
        if (response.data.account_creation_status === 'success') {
            log.info(`[ACTION]: dispatch HANDLE_SIGN_UP account_creation_status = ${response.data.account_creation_status}.`)
            history.push("/signin");
        } else {
            console.log('response.data.error_msg = ' + response.data.error_msg);
            log.info(`[ACTION]: dispatch HANDLE_SIGN_UP_ERROR response.data.error_msg = ${response.data.error_msg}.`)
            dispatch({type: HANDLE_SIGN_UP_ERROR, payload: response.data.error_msg});
        }
    }
}

export const sendPaymentToken = (token) => async dispatch => {
    log.info(`Token = ${JSON.stringify(token)}`)
    let config = {
        method: 'post',
        url: 'http://localhost:9050/payment',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(token)
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            let paymentResponse = {
                ...response.data,
                last4: token.card.last4, exp_year: token.card.exp_year,
                exp_month: token.card.exp_month, brand: token.card.brand
            }

            if (paymentResponse.payment_failed) {
                history.push(`/checkout/cancel-payment/${response.data.charge_id}`)
            } else {
                history.push(`/checkout/success-payment/${response.data.charge_id}`)
                Cookies.remove(CART_TOTAL_COOKIE)
                Cookies.remove(SHOPPERS_PRODUCT_INFO_COOKIE)

                dispatch({
                    type: CART_TOTAL,
                    payload: 0
                })
            }

            dispatch({
                type: PAYMENT_RESPONSE,
                payload: paymentResponse
            })

        })
        .catch(function (error) {
            console.log(error);
            dispatch({
                type: PAYMENT_RESPONSE,
                payload: {error: true}
            })
        });
}


export const getDataViaAPI = (type, uri) => async dispatch => {
    log.info(`[ACTION]: invokeAndDispatchAPIData Calling API = ${uri}.`)

    if (uri) {
        commonServiceAPI.defaults.timeout = 15000;
        uri = uri.replace(/\s/g, '')
        let responseError = false
        const response = await commonServiceAPI.get(uri)
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

            if (LOAD_FILTER_PRODUCTS.localeCompare(type) === 0 &&
                window.location.search.localeCompare(uri.split("/products")[1]) !== 0) {
                history.push(uri)
            }
        } else {
            dispatch({type: type, payload: {isLoading: false, statusCode: BAD_REQUEST_ERROR_CODE}});
        }
    }
}

export const loadFilterAttributes = filterQuery => async dispatch => {
    log.info(`[ACTION]: loadFilterAttributes Calling Filter API filterQuery = ${filterQuery}`)

    if (filterQuery) {
        let removedSpacesFromFilterQuery = filterQuery.replace(/\s/g, '')
        let uri = `/filter${removedSpacesFromFilterQuery}`
        const response = await commonServiceAPI.get(uri);
        if (response != null) {
            log.trace(`[ACTION]: Filter = ${JSON.stringify(response.data)}`)

            const extractRequiredParams = removedSpacesFromFilterQuery.slice(3)

            dispatch({
                type: LOAD_FILTER_ATTRIBUTES,
                payload: JSON.parse(JSON.stringify(
                    {
                        ...response.data,
                        "query": removedSpacesFromFilterQuery.slice(3)
                    }))
            });

            dispatch({
                type: SAVE_QUERY_STATUS,
                payload: extractRequiredParams
            });

            return JSON.parse(JSON.stringify(response.data))
        } else {
            log.info(`[ACTION]: unable to fetch response for Filter API`)
        }
    }
};
