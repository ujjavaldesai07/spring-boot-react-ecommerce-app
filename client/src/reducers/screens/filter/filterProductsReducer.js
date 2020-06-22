import {LOAD_FILTER_PRODUCTS} from "../../../actions/types";

export default (state = null, action) => {
    switch (action.type) {
        case LOAD_FILTER_PRODUCTS:
            return action.payload;
        default:
            return state;
    }
};