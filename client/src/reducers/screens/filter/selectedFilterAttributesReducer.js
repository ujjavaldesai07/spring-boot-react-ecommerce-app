import {
    ADD_APPAREL_CATEGORY, ADD_BRAND_CATEGORY,
    ADD_GENDER_CATEGORY, ADD_PRICE_CATEGORY, REMOVE_APPAREL_CATEGORY, REMOVE_BRAND_CATEGORY,
    REMOVE_GENDER_CATEGORY, REMOVE_PRICE_CATEGORY, SELECT_PRODUCT_DETAIL, SELECT_PRODUCT_PAGE, SELECT_SORT_CATEGORY
} from "../../../actions/types";
import log from 'loglevel';
import {INITIAL_PAGINATION_STATE, INITIAL_SORT_STATE} from "../../../constants/constants";

const removeValueIfExist = (list, id) => {
    if(list.length === 0) {
        return null
    }

    let valueExist = false

    // eslint-disable-next-line array-callback-return
    let filteredList = list.filter(obj => {
        if(obj.id !== id) {
            return obj;
        }
        valueExist = true
    })

    // if value exist then return the filter list
    if(valueExist) {
        return filteredList
    }

    return null
}

export const selectGenderReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_GENDER_CATEGORY:
            // if id found then remove it
            if(action.payload.id) {
                let filterList = removeValueIfExist(state, action.payload.id)
                if (filterList) {
                    return filterList
                }
            }

            if(action.payload.attrList) {
                return action.payload.attrList;
            }

            return [action.payload]
        case REMOVE_GENDER_CATEGORY:
            return []
        default:
            return state;
    }
};

export const selectApparelReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_APPAREL_CATEGORY:
            if(action.payload.id) {
                let filterList = removeValueIfExist(state, action.payload.id)
                if (filterList) {
                    return filterList
                }
            }

            if(action.payload.attrList) {
                return state.concat(action.payload.attrList);
            }

            return [...state, action.payload]

        case REMOVE_APPAREL_CATEGORY:
            return []
        default:
            return state;
    }
};

export const selectBrandReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_BRAND_CATEGORY:
            if(action.payload.id) {
                let filterList = removeValueIfExist(state, action.payload.id)
                if (filterList) {
                    return filterList
                }
            }

            if(action.payload.attrList) {
                return state.concat(action.payload.attrList);
            }

            return [...state, action.payload]
        case REMOVE_BRAND_CATEGORY:
            return []
        default:
            return state;
    }
};

export const selectPriceReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_PRICE_CATEGORY:
            if(action.payload.id) {
                let filterList = removeValueIfExist(state, action.payload.id)
                if (filterList) {
                    return filterList
                }
            }

            if(action.payload.attrList) {
                return state.concat(action.payload.attrList);
            }

            return [...state, action.payload]
        case REMOVE_PRICE_CATEGORY:
            return []
        default:
            return state;
    }
};

export const selectSortReducer = (state = INITIAL_SORT_STATE, action) => {
    switch (action.type) {
        case SELECT_SORT_CATEGORY:
            if(action.payload.attrList) {
                return action.payload.attrList[0];
            }

            return action.payload
        default:
            return state;
    }
};

export const selectPageReducer = (state = INITIAL_PAGINATION_STATE, action) => {
    switch (action.type) {
        case SELECT_PRODUCT_PAGE:
            return action.payload
        default:
            return state;
    }
};

export const selectProductReducer = (state = null, action) => {
    switch (action.type) {
        case SELECT_PRODUCT_DETAIL:
            return action.payload
        default:
            return state;
    }
};