import {SELECT_FILTER_ATTRIBUTES} from "../../../actions/types";
import log from 'loglevel';
import {MAX_PRODUCTS_PER_PAGE, INITIAL_FILTER_ATTRIBUTES_STATE} from "../../../constants/constants";

const checkObjectAlreadyExist = (prevState, payload, objName) => {
    let alreadyExist = false
    let newArray = []
    if (prevState[objName] && prevState[objName].length > 0) {
        newArray = prevState[objName].filter(id => {
            if (id === payload[objName]) {
                alreadyExist = true
                return null
            }
            return payload[objName]
        })
    }

    if (alreadyExist) {
        log.debug("[SelectedFilterAttributesReducer] alreadyExist = " +
            JSON.stringify({
                ...prevState, [objName]: newArray,
                page: [0, MAX_PRODUCTS_PER_PAGE], clearAll: false
            }))
        return {...prevState, [objName]: newArray, page: [0, MAX_PRODUCTS_PER_PAGE], clearAll: false};
    }

    if (prevState[objName]) {
        log.debug("[SelectedFilterAttributesReducer] prevState[objName] = "
            + JSON.stringify({
                ...prevState, [objName]: [...prevState[objName], payload[objName]],
                page: [0, MAX_PRODUCTS_PER_PAGE], clearAll: false
            }))
        return {
            ...prevState, [objName]: [...prevState[objName], payload[objName]],
            page: [0, MAX_PRODUCTS_PER_PAGE], clearAll: false
        };
    }

    log.debug("[SelectedFilterAttributesReducer] prevState[objName] is null = "
        + JSON.stringify({...prevState, [objName]: payload[objName]}))
    return {
        ...prevState, [objName]: payload[objName],
        page: [0, MAX_PRODUCTS_PER_PAGE], clearAll: false
    };
}

export default (state = INITIAL_FILTER_ATTRIBUTES_STATE, action) => {
    switch (action.type) {
        case SELECT_FILTER_ATTRIBUTES:
            if (action.payload.gender) {
                return {...state, gender: action.payload.gender, page: [0, MAX_PRODUCTS_PER_PAGE], clearAll: false};
            }

            if (action.payload.apparel) {
                return checkObjectAlreadyExist(state, action.payload, "apparel");
            }

            if (action.payload.brand) {
                return checkObjectAlreadyExist(state, action.payload, "brand");
            }

            if (action.payload.price) {
                return checkObjectAlreadyExist(state, action.payload, "price");
            }

            if (action.payload.page) {
                return {...state, page: action.payload.page};
            }

            if (action.payload.sortBy) {
                return {...state, sortBy: action.payload.sortBy, page: [0, MAX_PRODUCTS_PER_PAGE]};
            }

            if (action.payload.clearAll) {
                return {...INITIAL_FILTER_ATTRIBUTES_STATE, clearAll: action.payload.clearAll};
            }

            if (action.payload.reloadAttrState) {
                return action.payload.reloadAttrState;
            }
            break
        default:
            return state;
    }
};