import {HANDLE_TAB_HOVER_EVENT} from "../../actions/types";
import log from "loglevel";

const INITIAL_STATE = {
    index: false,
    hover: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HANDLE_TAB_HOVER_EVENT:
            log.debug(`[TAB_HOVER_EVENT_REDUCER]: action.payload = ${JSON.stringify(action.payload)}`)
            return action.payload;

        default:
            return state;
    }
};