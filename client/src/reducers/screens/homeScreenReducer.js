import {HANDLE_MAIN_SCREEN} from "../../actions/types";
import log from "loglevel";

export default (state = null, action) => {
    log.trace(`[HOME_SCREEN_REDUCER]: action.type = ${action.type}`)
    switch (action.type) {
        case HANDLE_MAIN_SCREEN:
            log.trace(`[HOME_SCREEN_REDUCER]: action.payload = ${JSON.stringify(action.payload)}`)
            return action.payload;
        default:
            return state;
    }
};