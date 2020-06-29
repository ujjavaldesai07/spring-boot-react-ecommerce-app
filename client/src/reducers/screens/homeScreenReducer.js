import {LOAD_FILTER_PRODUCTS, HANDLE_MAIN_SCREEN} from "../../actions/types";
import log from "loglevel";

// any one screen can be active at a time so it
// is preferred to use the same reducer for filter screen
// & home screen.
export default (state = null, action) => {
    log.trace(`[HOME_SCREEN_REDUCER]: action.type = ${action.type}`)
    switch (action.type) {
        case HANDLE_MAIN_SCREEN:
        case LOAD_FILTER_PRODUCTS:
            log.trace(`[HOME_SCREEN_REDUCER]: action.payload = ${JSON.stringify(action.payload)}`)
            return action.payload;
        default:
            return state;
    }
};