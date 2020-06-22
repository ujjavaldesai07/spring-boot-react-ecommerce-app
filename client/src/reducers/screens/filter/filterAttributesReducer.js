import {LOAD_FILTER_ATTRIBUTES} from "../../../actions/types";

export default (state = null, action) => {
    switch (action.type) {
        case LOAD_FILTER_ATTRIBUTES:
            return action.payload;
        default:
            return state;
    }
};