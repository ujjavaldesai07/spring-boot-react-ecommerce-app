import {HANDLE_IMAGE_CLICK_EVENT} from "../../actions/types";
import log from "loglevel";

const INITIAL_MOUSE_STATE = {
    filterQuery: null
}

export default (state = INITIAL_MOUSE_STATE, action) => {
    switch (action.type) {
        case HANDLE_IMAGE_CLICK_EVENT:
            log.debug(`[IMAGE_CLICK_EVENT_REDUCER]: action.payload = ${JSON.stringify(action.payload)}`)
            return action.payload;

        default:
            return state;
    }
};