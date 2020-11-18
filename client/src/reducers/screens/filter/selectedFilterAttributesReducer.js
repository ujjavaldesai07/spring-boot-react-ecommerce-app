import {
    ADD_SELECTED_CATEGORY, CLEAR_ALL_FILTERS, LOAD_SELECTED_CATEGORY_FROM_URL,
    REMOVE_SELECTED_CATEGORY, RESET_SELECT_PRODUCT_PAGE, RESET_SELECT_SORT_CATEGORY, RESET_SELECTED_CATEGORY,
    SELECT_PRODUCT_PAGE,
    SELECT_SORT_CATEGORY
} from "../../../actions/types";
import log from 'loglevel';
import {
    FILTER_ATTRIBUTES,
    INITIAL_SELECTED_FILTER_ATTRIBUTE_STATE,
    INITIAL_PAGINATION_STATE,
    INITIAL_SORT_STATE
} from "../../../constants/constants";

const removeValueIfExist = (list, id) => {
    if (list.length === 0) {
        return null
    }

    console.log(`list = ${JSON.stringify(list)}`)

    let valueExist = false

    // eslint-disable-next-line array-callback-return
    let filteredList = list.filter(obj => {
        if (obj.id !== id) {
            return obj;
        }
        valueExist = true
    })

    // if value exist then return the filter list
    if (valueExist) {
        return filteredList
    }

    return null
}

const appendNewPayloadToPrevState = (prevState, payload) => {
    log.info(`[SelectedFilterAttributesReducer] payload = ${JSON.stringify(payload)}`)
    FILTER_ATTRIBUTES.forEach((attribute) => {
        if (payload[attribute]) {
            log.info(`[SelectedFilterAttributesReducer] payload[attribute] = ${JSON.stringify(payload[attribute])}`)
            if (payload[attribute].id) {
                if (payload[attribute].hasOwnProperty("append") && payload[attribute].append === false) {
                    // swap the object property
                    prevState = {...prevState, [attribute]: [payload[attribute]]}
                } else {
                    let filterList = removeValueIfExist(prevState[attribute], payload[attribute].id)
                    if (filterList) {

                        // for single object removal from list
                        log.info(`[SelectedFilterAttributesReducer] prevState = ${JSON.stringify(prevState)},` +
                            `filterList = ${JSON.stringify(filterList)}`)
                        prevState = {...prevState, [attribute]: filterList}
                    } else {

                        // for single object addition in list
                        prevState = {...prevState, [attribute]: [...prevState[attribute], payload[attribute]]}
                    }
                }
            } else if (payload[attribute].attrList) {
                log.info(`[SelectedFilterAttributesReducer] attrList = ${JSON.stringify(payload[attribute])}`)

                // for list of object addition
                prevState = {...prevState, [attribute]: payload[attribute].attrList};

                log.info(`[SelectedFilterAttributesReducer] newState = ${JSON.stringify(prevState)}`)
            }
        }
    })

    if(payload.hasOwnProperty("newQuery")) {
        prevState = {...prevState, newQuery: payload.newQuery}
    }

    if(payload.hasOwnProperty("oldQuery")) {
        prevState = {...prevState, oldQuery: payload.oldQuery}
    }

    return prevState
}

export const selectedFilterAttributesReducer = (state = INITIAL_SELECTED_FILTER_ATTRIBUTE_STATE, action) => {

    switch (action.type) {
        case ADD_SELECTED_CATEGORY:
            return appendNewPayloadToPrevState(state, action.payload);

        case REMOVE_SELECTED_CATEGORY:
            return {...INITIAL_SELECTED_FILTER_ATTRIBUTE_STATE, oldQuery: state.oldQuery, newQuery: action.payload.newQuery}

        case RESET_SELECTED_CATEGORY:
            return {genders: [], apparels: [], brands: [], prices: []}

        case LOAD_SELECTED_CATEGORY_FROM_URL:
            return appendNewPayloadToPrevState(INITIAL_SELECTED_FILTER_ATTRIBUTE_STATE, action.payload);

        default:
            return state;
    }
};

export const selectSortReducer = (state
                                      = INITIAL_SORT_STATE, action) => {
    switch (action.type) {
        case SELECT_SORT_CATEGORY:
            return action.payload

        case RESET_SELECT_SORT_CATEGORY:
            return INITIAL_SORT_STATE

        default:
            return state;
    }
};

export const selectPageReducer = (state
                                      = INITIAL_PAGINATION_STATE, action) => {
    switch (action.type) {
        case SELECT_PRODUCT_PAGE:
            return action.payload

        case RESET_SELECT_PRODUCT_PAGE:
            return INITIAL_PAGINATION_STATE

        default:
            return state;
    }
};

export const clearFiltersReducer = (state = false, action) => {
    switch (action.type) {
        case CLEAR_ALL_FILTERS:
            return action.payload;
        default:
            return state;
    }
}