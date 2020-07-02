import React from 'react';
import CheckboxList from "../../../ui/checkboxList";
import log from 'loglevel';
import {useDispatch, useSelector} from "react-redux";
import {
    ADD_APPAREL_CATEGORY
} from "../../../../actions/types";

export default function ApparelCheckBox() {
    const dispatch = useDispatch()
    const apparelList = useSelector(state => state.filterAttributesReducer?
        state.filterAttributesReducer.apparels : null)
    const selectedApparels = useSelector(state => state.selectApparelReducer)

    if(!apparelList) {
        log.debug(`[ApparelCheckBox] apparelList is null`)
        return null
    }

    const handleCheckBoxChange = (id, value) => {
        log.info(`[ApparelCheckBox] handleCheckBoxChange(id) = ${id}, value = ${value}`)
        dispatch({
            type: ADD_APPAREL_CATEGORY,
            payload: {
                id, value
            }
        })
    }

    log.debug(`[ApparelCheckBox] selectedApparels = ${JSON.stringify(selectedApparels)}`)

    log.info(`[ApparelCheckBox] Rendering ApparelCheckBox Component`)

    return (
            <CheckboxList attrList={apparelList}
                          fontSize="1rem"
                          title="Apparel"
                          selectedAttrList={selectedApparels}
                          onChangeHandler={handleCheckBoxChange}/>
    );
}
