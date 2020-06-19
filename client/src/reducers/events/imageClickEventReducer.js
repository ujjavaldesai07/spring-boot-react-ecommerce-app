import {HANDLE_IMAGE_CLICK_EVENT} from "../../actions/types";

const INITIAL_MOUSE_STATE = {
    filterQuery: null
}

export default (state = INITIAL_MOUSE_STATE, action) => {
    switch (action.type) {
        case HANDLE_IMAGE_CLICK_EVENT:
            // console.log("Coming to reducer filterQuery = " + JSON.stringify(action.payload))
            return action.payload;

        default:
            return state;
    }
};