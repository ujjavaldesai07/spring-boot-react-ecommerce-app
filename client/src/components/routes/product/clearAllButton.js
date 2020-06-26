import React from 'react';
import log from 'loglevel';
import {useDispatch} from "react-redux";
import {
    REMOVE_APPAREL_CATEGORY, REMOVE_BRAND_CATEGORY,
    REMOVE_GENDER_CATEGORY, REMOVE_PRICE_CATEGORY
} from "../../../actions/types";
import Button from "@material-ui/core/Button";

export default function ClearAllButton() {
    const dispatch = useDispatch()

    const handleClearAllClick = () => {
        log.info(`[ClearAllButton] handleClearAllClick(value)`)

        dispatch({type: REMOVE_GENDER_CATEGORY})
        dispatch({type: REMOVE_APPAREL_CATEGORY})
        dispatch({type: REMOVE_BRAND_CATEGORY})
        dispatch({type: REMOVE_PRICE_CATEGORY})
    }

    log.info(`[ClearAllButton] Rendering ClearAllButton Component`)

    return (
        <>
            <Button onClick={handleClearAllClick} style={{fontWeight: "bold"}}
                    color="secondary">CLEAR ALL</Button>
        </>
    );
}
