import{ useEffect } from "react";
import log from "loglevel";
import {useDispatch, useSelector} from "react-redux";
import {SAVE_SORT_LIST} from "../../../../actions/types";

export function useSortList(list, propName) {
    const dispatch = useDispatch();
    const filterQuery = useSelector(state => state.filterQueryReducer)

    useEffect(() => {
        if(!list) {
            return
        }

        try {
            log.info(`[useSortList] Sorting list for prop = ${propName}`)
            let cloneList = JSON.parse(JSON.stringify(list));

            cloneList.sort((a, b) =>
                (a.value.charAt(0).toUpperCase() > b.value.charAt(0).toUpperCase()) ? 1 : -1)

            dispatch({
                type: SAVE_SORT_LIST,
                payload: {
                    [propName]: cloneList
                }
            })
        } catch (e) {
            log.error("[CheckboxList] unable to sort data.")
            return null
        }

    }, [list]);
}