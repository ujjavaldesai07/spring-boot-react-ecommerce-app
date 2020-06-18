import {HANDLE_FILTER_SCREEN} from "../../actions/types";

export default (state = null, action) => {
    switch (action.type) {
        case HANDLE_FILTER_SCREEN:
            return action.payload;
        default:
            return state;
    }
};