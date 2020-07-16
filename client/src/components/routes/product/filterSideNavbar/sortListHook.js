import{ useEffect } from "react";
import log from "loglevel";
import {useDispatch} from "react-redux";
import {SAVE_SORT_LIST} from "../../../../actions/types";
import {filterAttributesReducer} from "../../../../reducers/screens/commonScreenReducer";

export function useSortList(list, propName) {
    const dispatch = useDispatch();

    useEffect(() => {
        if(!list) {
            return
        }

        try {
            log.info(`[useSortList] Sorting list for prop = ${propName}`)
            let sortedAttrList = list.sort((a, b) =>
                (a.value.charAt(0).toUpperCase() > b.value.charAt(0).toUpperCase()) ? 1 : -1)

            dispatch({
                type: SAVE_SORT_LIST,
                payload: {
                    [propName]: sortedAttrList
                }
            })
        } catch (e) {
            log.error("[CheckboxList] unable to sort data.")
            return null
        }

    }, [filterAttributesReducer]);
}