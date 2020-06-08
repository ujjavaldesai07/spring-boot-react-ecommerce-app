import {SIGN_IN, SIGN_OUT, SIGN_IN_ERROR} from "../actions/types";
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
        default:
            return state;
    }
};