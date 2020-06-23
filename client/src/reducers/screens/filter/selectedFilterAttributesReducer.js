import {CLEAR_FILTER_ATTRIBUTES, SET_FILTER_ATTRIBUTES} from "../../../actions/types";

const INITIAL_FILTER_STATE = {
    gender: [],
    apparel: [],
    brand: [],
    price: [],
    page: [0, 12],
    sortBy: [1, undefined, "newest"]
}

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
        console.log("newArray = " + newArray)
        console.log("alreadyExist = " +  JSON.stringify({...prevState, [objName]: newArray}))
        return {...prevState, [objName]: newArray};
    }

    if (prevState[objName]) {
        console.log("prevState[objName] = " + JSON.stringify({...prevState, [objName]: [...prevState[objName], payload[objName]]}))
        return {...prevState, [objName]: [...prevState[objName], payload[objName]]};
    }

    console.log("prevState[objName] is null = " + JSON.stringify({...prevState, [objName]: payload[objName]}))
    return {...prevState, [objName]: payload[objName]};
}

export default (state = INITIAL_FILTER_STATE, action) => {
    switch (action.type) {
        case SET_FILTER_ATTRIBUTES:
            if (action.payload.gender) {
                return {...state, gender: action.payload.gender};
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
                return {...state, sortBy: action.payload.sortBy};
            }

            break
        case CLEAR_FILTER_ATTRIBUTES:
            return INITIAL_FILTER_STATE

        default:
            return state;
    }
};