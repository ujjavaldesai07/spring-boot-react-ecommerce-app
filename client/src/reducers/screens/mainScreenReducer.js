import {HANDLE_FILTER_SCREEN, HANDLE_MAIN_SCREEN} from "../../actions/types";

export default (state = null, action) => {
    switch (action.type) {
        case HANDLE_MAIN_SCREEN:
        case HANDLE_FILTER_SCREEN:
            return action.payload;
        default:
            return state;
    }
};