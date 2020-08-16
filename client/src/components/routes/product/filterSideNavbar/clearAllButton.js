import React from 'react';
import log from 'loglevel';
import {useDispatch, useSelector} from "react-redux";
import {REMOVE_SELECTED_CATEGORY} from "../../../../actions/types";

function ClearAllButton() {
    const dispatch = useDispatch()
    const selectedFilterAttribute = useSelector(state => state.selectedFilterAttributesReducer)

    // check if any filter is selected or not
    if((selectedFilterAttribute.genders.length + selectedFilterAttribute.apparels.length
        + selectedFilterAttribute.brands.length + selectedFilterAttribute.prices.length) === 0) {
        log.info(`[ClearAllButton] selected attribute are null`)
        return null
    }

    /**
     * remove all selected filters
     */
    const handleClearAllClick = () => {
        log.info(`[ClearAllButton] handleClearAllClick(value)`)
        dispatch({type: REMOVE_SELECTED_CATEGORY})
    }

    log.info(`[ClearAllButton] Rendering ClearAllButton Component`)

    return (
        <>
            <div onClick={handleClearAllClick} style={{fontWeight: "bold", cursor: 'pointer',
                fontSize: '0.9rem', height: 'inherit', color: 'red'}}>CLEAR ALL</div>
        </>
    );
}

export default ClearAllButton;