import {HANDLE_TAB_HOVER_EVENT} from "../../actions/types";

const INITIAL_STATE = {
    index: false,
    hover: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HANDLE_TAB_HOVER_EVENT:
            return action.payload;

        default:
            return state;
    }
};