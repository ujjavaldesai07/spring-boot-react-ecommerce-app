import {HANDLE_FILTER_PRODUCTS} from "../../../actions/types";

export default (state = null, action) => {
    switch (action.type) {
        case HANDLE_FILTER_PRODUCTS:
            return action.payload;
        default:
            return state;
    }
};