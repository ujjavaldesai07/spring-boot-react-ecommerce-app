import {TAB_CLICK} from "../actions/types";

const INITIAL_TAB_STATE = {
    index: false,
    hover: false
}

export default (state = INITIAL_TAB_STATE, action) => {
    switch (action.type) {
        case TAB_CLICK:
            return action.payload;
        default:
            return state;
    }
};