import {
    HANDLE_SIGN_IN, HANDLE_SIGN_UP, HANDLE_SIGN_UP_ERROR, HANDLE_MAIN_SCREEN,
    HANDLE_SIGN_OUT, HANDLE_TOKEN_ID, HANDLE_SIGN_IN_ERROR, LOAD_FILTER_PRODUCTS, LOAD_FILTER_ATTRIBUTES,
} from './types';
import authApi from "../api/authServiceApi";
import history from "../history";
import {Base64} from 'js-base64';
import Cookies from 'js-cookie';
import commonServiceApi from "../api/commonServiceApi";

export const setTokenFromCookie = tokenId => {
    console.log("Calling the setTokenFromCookie...")
    return {
        type: HANDLE_SIGN_IN,
        payload: tokenId
    }
}

export const signIn = formValues => async (dispatch) => {
    const hash = Base64.encode(`${formValues.Username}:${formValues.Password}`);
    authApi.defaults.headers.common['Authorization'] = `Basic ${hash}`
    authApi.defaults.timeout = 5000;
    const response = await authApi.post('/authenticate').catch(err => {
        dispatch({type: HANDLE_SIGN_IN_ERROR, payload: err.message});
    });

    if (response) {
        if (response.data.jwt) {
            dispatch({type: HANDLE_SIGN_IN, payload: response.data.jwt});
            Cookies.set(HANDLE_TOKEN_ID, response.data.jwt, {expires: 7});
            history.push('/');
        } else {
            dispatch({type: HANDLE_SIGN_IN_ERROR, payload: response.data.error});
        }
    }
}

export const signOut = () => {
    Cookies.remove(HANDLE_TOKEN_ID)
    return {
        type: HANDLE_SIGN_OUT
    }
}

export const signUp = formValues => async (dispatch) => {
    authApi.defaults.timeout = 5000;
    const response = await authApi.post('/signup', {
        'username': formValues.Username,
        'password': formValues.Password,
        'firstname': formValues.FirstName,
        'lastname': formValues.LastName,
        'email': formValues.Email.toLowerCase(),
    }).catch(err => {
        dispatch({type: HANDLE_SIGN_UP_ERROR, payload: err.message});
    });

    if (response) {
        if (response.data.account_creation_status === 'success') {
            dispatch({type: HANDLE_SIGN_UP, payload: response.data.account_creation_status});

        } else {
            console.log('response.data.error_msg = ' + response.data.error_msg);
            dispatch({type: HANDLE_SIGN_UP_ERROR, payload: response.data.error_msg});
        }
    }
}

export const loadMainScreen = () => async dispatch => {
    const response = await commonServiceApi.get('/main');
    // console.log("LoadMainScreen API = " + JSON.parse(JSON.stringify(response.data)))
    if(response != null) {
        dispatch({type: HANDLE_MAIN_SCREEN, payload: JSON.parse(JSON.stringify(response.data))});
    }
};

export const loadFilterProducts = filterQuery => async dispatch => {

    console.log("Calling Products API.... =" + filterQuery)

    // Reloading or direct url
    if(!filterQuery) {
        let url = window.location.href.split("products?q=")
        filterQuery = url? url[1] : "category=all::page=0,12"
    }

    filterQuery = filterQuery.replace(/\s/g, '');

    if(filterQuery) {
        const response = await commonServiceApi.get(`/products?q=${filterQuery}`);
        if(response != null) {
            // console.log("Products = " + JSON.stringify(response.data))
            dispatch({type: LOAD_FILTER_PRODUCTS, payload: JSON.parse(JSON.stringify(response.data))});
            history.push('/products?q=' + filterQuery);
        }
    }
};

export const loadFilterAttributes = () => async dispatch => {
    console.log("Calling Filter API....")
        const response = await commonServiceApi.get('/filter');
        if(response != null) {
            // console.log("Filter = " + JSON.stringify(response.data))
            dispatch({type: LOAD_FILTER_ATTRIBUTES, payload: JSON.parse(JSON.stringify(response.data))});
        }
};