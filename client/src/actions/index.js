import {
    TAB_CLICK, SIGN_IN,
    SIGN_OUT, TOKEN_ID, SIGN_IN_ERROR, SIGN_UP, SIGN_UP_ERROR
} from './types';
import authApi from "../api/authApi";
import history from "../history";
import {Base64} from 'js-base64';
import Cookies from 'js-cookie';

export const setTokenFromCookie = tokenId => {
    return {
        type: SIGN_IN,
        payload: tokenId
    }
}

export const tabClick = (index, hover) => {
    return {
        type: TAB_CLICK,
        payload: {
            index: index,
            hover: hover
        }
    }
}

export const signIn = formValues => async (dispatch) => {

    const hash = Base64.encode(`${formValues.Username}:${formValues.Password}`);
    authApi.defaults.headers.common['Authorization'] = `Basic ${hash}`
    authApi.defaults.timeout = 5000;
    const response = await authApi.post('/authenticate').catch(err => {
        dispatch({type: SIGN_IN_ERROR, payload: err.message});
    });

    if (response) {
        if (response.data.jwt) {
            dispatch({type: SIGN_IN, payload: response.data.jwt});
            Cookies.set(TOKEN_ID, response.data.jwt, {expires: 7});
            history.push('/');
        } else {
            dispatch({type: SIGN_IN_ERROR, payload: response.data.error});
        }
    }
}

export const signOut = () => {
    Cookies.remove(TOKEN_ID)
    return {
        type: SIGN_OUT
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
        dispatch({type: SIGN_UP_ERROR, payload: err.message});
    });

    if (response) {
        console.log('account_creation_status = ' + response.data.account_creation_status.localeCompare('success'))
        console.log('account_creation_status = ' + response.data.account_creation_status)
        if (response.data.account_creation_status === 'success') {
            dispatch({type: SIGN_UP, payload: response.data.account_creation_status});
            history.push('/verification_email');
        } else {
            console.log('response.data.error_msg = ' + response.data.error_msg);
            dispatch({type: SIGN_UP_ERROR, payload: response.data.error_msg});
        }
    }
}

// export const createStream = formValues => async (dispatch, getState) => {
//     const {userId} = getState().auth;
//     const response = await streams.post('/streams', {...formValues, userId});
//     dispatch({type: CREATE_STREAM, payload: response.data});
//     history.push('/');
// };
//
// export const fetchStreams = () => async dispatch => {
//     const response = await streams.get('/streams');
//     dispatch({type: FETCH_STREAMS, payload: response.data});
// };
//
// export const fetchStream = id => async dispatch => {
//     const response = await streams.get(`/streams/${id}`);
//     dispatch({type: FETCH_STREAM, payload: response.data});
// };
//
// export const deleteStream = id => async dispatch => {
//     await streams.delete(`/streams/${id}`);
//     dispatch({type: DELETE_STREAM, payload: id});
//     history.push('/');
// };
//
// export const editStream = (id, formValues) => async dispatch => {
//     const response = await streams.patch( `/streams/${id}`, formValues);
//     dispatch({type: EDIT_STREAM, payload: response.data});
//     history.push('/');
// };