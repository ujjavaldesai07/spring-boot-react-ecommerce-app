import {LOAD_FILTER_ATTRIBUTES} from "../../../actions/types";
import log from "loglevel";

export default (state = null, action) => {
    switch (action.type) {
        case LOAD_FILTER_ATTRIBUTES:
            log.trace(`[FILTER_ATTRIBUTES_REDUCER]: action.payload = ${JSON.stringify(action.payload)}`)
            return action.payload;
        default:
            return state;
    }
};