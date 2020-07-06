import {HANDLE_TAB_HOVER_EVENT} from "../../actions/types";
import log from "loglevel";

export const tabHoverEventReducer = (state
                                         = {index: false, hover: false, tabColor: "black"}, action) => {
    switch (action.type) {
        case HANDLE_TAB_HOVER_EVENT:
            log.debug(`[TAB_HOVER_EVENT_REDUCER]: action.payload = ${JSON.stringify(action.payload)}`)
            return action.payload;

        default:
            return state;
    }
};