import {
    HANDLE_SIGN_IN, HANDLE_SIGN_OUT,
    HANDLE_SIGN_IN_ERROR, HANDLE_SIGN_UP_ERROR,
    HANDLE_SIGN_UP
} from "../../actions/types";
import _ from 'lodash';

const INITIAL_STATE = {
    isSignedIn: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HANDLE_SIGN_IN:
            return {...state, isSignedIn: true, tokenId: action.payload};
        case HANDLE_SIGN_IN_ERROR:
            return {...state, isSignedIn: false, errorMsg: action.payload};
        case HANDLE_SIGN_OUT:
            return _.omit(state, 'tokenId', 'errorMsg');
        case HANDLE_SIGN_UP:
            return {...state, account_status: action.payload};
        case HANDLE_SIGN_UP_ERROR:
            console.log('action.payload = ' + action.payload)
            return {...state, errorMsg: action.payload};
        default:
            return state;
    }
};