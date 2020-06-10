import {SIGN_IN, SIGN_OUT, SIGN_IN_ERROR, SIGN_UP_ERROR, SIGN_UP} from "../actions/types";
import _ from 'lodash';

const INITIAL_STATE = {
    isSignedIn: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {...state, isSignedIn: true, tokenId: action.payload};
        case SIGN_IN_ERROR:
            return {...state, isSignedIn: false, errorMsg: action.payload};
        case SIGN_OUT:
            return _.omit(state, 'tokenId', 'errorMsg');
        case SIGN_UP:
            return {...state, account_status: action.payload};
        case SIGN_UP_ERROR:
            console.log('action.payload = ' + action.payload)
            return {...state, errorMsg: action.payload};
        default:
            return state;
    }
};