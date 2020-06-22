import {SET_FILTER_ATTRIBUTES} from "../../../actions/types";

const INITIAL_FILTER_STATE = {
    gender: [],
    apparel: [],
    brand: [],
    price: []
}

// const checkObjectAlreadyExist = (prevStateObjList, newObj) => {
//     let alreadyExist = false
//     let newState = null
//     if (prevStateObjList && prevStateObjList.length > 0) {
//         console.log("newObj.Id1 == " + newObj.id)
//         newState = prevStateObjList.filter(obj => {
//             console.log("newObj.Id2 == " + newObj.id)
//             if (obj.id !== newObj.id) {
//                 console.log("newObj.Id3 == " + newObj.id)
//                 return newObj
//             }
//             alreadyExist = true
//         })
//     }
//     if (alreadyExist) {
//         return newState
//     }
//     return null
// }

const checkObjectAlreadyExist = (prevState, payload, objName) => {
    let alreadyExist = false
    let newState = null
    if (prevState[objName] && prevState[objName].length > 0) {
        newState = prevState[objName].filter(obj => {
            if (obj.id !== payload[objName].id) {
                return payload[objName]
            }
            alreadyExist = true
        })
    }
    if (alreadyExist) {
        return {...prevState, [objName]: newState};
    }

    if (prevState[objName]) {
        return {...prevState, [objName]: [...(prevState[objName]), payload[objName]]};
    }
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

        default:
            return state;
    }
};