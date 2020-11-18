import React, {useEffect, useState} from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import history from "../../../../history";
import ApparelCheckBox from "./apparelCheckBox";
import log from "loglevel";
import GenderRadioButton from "./genderRadioButton";
import BrandCheckBox from "./brandCheckBox";
import PriceCheckBox from "./priceCheckBox";
import ClearAllButton from "./clearAllButton";
import {connect, useDispatch, useSelector} from "react-redux";
import {loadFilterAttributes, getDataViaAPI} from "../../../../actions";
import {Grid} from "@material-ui/core";
import {useFilterNavBarStyles} from "../../../../styles/materialUI/filterNavBarStyles";
import {
    FILTER_ATTRIBUTES, MAX_PRODUCTS_PER_PAGE,
    PAGE_ATTRIBUTE, SORT_ATTRIBUTE
} from "../../../../constants/constants";
import {
    CLEAR_ALL_FILTERS,
    LOAD_FILTER_ATTRIBUTES, LOAD_SELECTED_CATEGORY_FROM_URL,
    SAVE_QUERY_STATUS, SAVE_SORT_LIST, SELECT_PRODUCT_PAGE, SELECT_SORT_CATEGORY,
} from "../../../../actions/types";
import {PRODUCTS_ROUTE} from "../../../../constants/react_routes";
import {FILTER_ATTRIBUTES_API} from "../../../../constants/api_routes";

function FilterNavBar(props) {
    const classes = useFilterNavBarStyles();
    const filterAttributes = useSelector(state => state.filterAttributesReducer)
    const dispatch = useDispatch()
    const resetFilter = useSelector(state => state.clearFiltersReducer)

    /**
     * check whether id exist in the filterAPIData list
     *
     * @param id
     * @param list
     * @returns {null|*}
     */
    const getObjectFromList = (id, list) => {
        log.info(`[FilterNavBar] getObjectFromList id = ${id}`)
        for (let i = 0; i < list.length; i++) {
            try {
                if (list[i].id === parseInt(id))
                    return list[i]
            } catch (e) {
                log.error(`Malformed URL: Unable to parse id = ${id}`)
                return null
            }
        }
        return null
    }

    /**
     * select options from URL and set it in redux store
     * filterAPI Data will be received from server side
     *
     * @param filterAPIData
     * @param queryFromURL
     */
    const dispatchFilterAttributesFromURL = (filterAPIData, queryFromURL) => {

        log.info(`[FilterNavBar] dispatchFilterAttributesFromURL` +
            ` queryFromURL = ${queryFromURL}, filterAPIData = ${filterAPIData}`)

        // check URI
        if (filterAPIData && history.location && history.location.pathname.localeCompare(PRODUCTS_ROUTE) === 0) {

            let selectedFilterAttributes = {}

            // eg: http://localhost:7071/products?q=sortby=3::page=16,16
            FILTER_ATTRIBUTES.forEach((attribute) => {

                // split string based on attribute.
                // for eg /products?q=genders=1::brands=2,3
                // where genders= and brands= are string to split
                // this will give start position
                let queryParameters = queryFromURL.split(`${attribute}=`)

                log.info(`[FilterNavBar] queryParameters = ${JSON.stringify(queryParameters)}`)

                // check whether we got any ids or not.
                if (queryParameters.length > 1) {

                    // 0th index consist of "?q=" which we are not interested
                    // actual data starts from pIndex=1
                    for (let pIndex = 1; pIndex < queryParameters.length; ++pIndex) {
                        let values
                        try {

                            // this will give end position
                            values = queryParameters[pIndex].split("::")[0].split(",")
                        } catch (e) {
                            log.error("[FilterNavBar] Corrupted URL. Unable to decode url field")
                        }

                        log.info(`[FilterNavBar] values = ${JSON.stringify(values)}`)
                        let selectedAttrList = []
                        if (values.length > 0) {
                            values.forEach(id => {

                                // check if Id is already present or not in the existing
                                // selected list in order to avoid duplicating the entries
                                let attrObject = getObjectFromList(id, filterAPIData[attribute])
                                log.info(`[FilterNavBar] attrObject = ${JSON.stringify(attrObject)}`)
                                if (attrObject) {

                                    // if found then push object to list
                                    selectedAttrList.push({
                                        id: attrObject.id,
                                        value: attrObject.value
                                    })
                                }
                            })

                            log.info(`[FilterNavBar] selectedAttrList = ${JSON.stringify(selectedAttrList)}`)
                            // check if we got any selected attributes from url
                            if (selectedAttrList.length > 0) {
                                selectedFilterAttributes = {
                                    ...selectedFilterAttributes,
                                    [attribute]: {
                                        attrList: selectedAttrList
                                    }
                                }
                            }
                        }
                    }
                }
            })

            // if selected attributes are found then dispatch to redux store
            log.info(`[FilterNavBar] dispatchFilterAttributesFromURL` +
                `dispatching selectedFilterAttributes=${JSON.stringify(selectedFilterAttributes)}`)
            dispatch({
                type: LOAD_SELECTED_CATEGORY_FROM_URL,
                payload: selectedFilterAttributes
            })
        }
    }

    const dispatchSortAttributeFromURL = (filterAPIData, queryFromURL) => {
        // dispatch sort type
        // eg: http://localhost:7071/products?q=sortby=3::page=16,16::category=all
        let queryParameters = queryFromURL.split(`${SORT_ATTRIBUTE}=`)
        if (filterAPIData && queryParameters.length > 1) {
            let id = queryParameters[1][0]
            let attrObject = getObjectFromList(id, filterAPIData[SORT_ATTRIBUTE])
            if (attrObject) {
                dispatch({
                    type: SELECT_SORT_CATEGORY,
                    payload: {
                        id: attrObject.id,
                        value: attrObject.type,
                        isLoadedFromURL: true
                    }
                })
            }
        }
    }

    const dispatchPageAttributeFromURL = (filterAPIData, queryFromURL) => {
        log.info(`dispatchPageAttributeFromURL = ${queryFromURL}`)
        // dispatch selected page
        // eg: http://localhost:7071/products?q=sortby=3::page=16,16::category=all
        let queryParameters = queryFromURL.split(`${PAGE_ATTRIBUTE}=`)
        if (filterAPIData && queryParameters.length > 1) {
            let id = queryParameters[1].split(",")
            if (id.length > 1) {
                try {
                    let pageNo = parseInt(id[0])
                    log.info(`pageNo = ${pageNo}`)
                    dispatch({
                        type: SELECT_PRODUCT_PAGE,
                        payload: {
                            pageNumber: pageNo > 0 ? pageNo + 1 : 1,
                            maxProducts: MAX_PRODUCTS_PER_PAGE,
                            isLoadedFromURL: true
                        }
                    })
                } catch (e) {
                    log.error(`Malformed URL: Unable to parse attribute name ${PAGE_ATTRIBUTE},` +
                        ` url = ${log.info(`dispatchPageAttributeFromURL = ${queryFromURL}`)}`)
                }
            }
        }
    }

    /**
     * Prepare sorted list for apparels and genders
     * @param list
     * @returns {any}
     */
    const sortByObjValues = (list) => {
        let cloneList = JSON.parse(JSON.stringify(list));

        return cloneList.sort((a, b) =>
            (a.value.charAt(0).toUpperCase() > b.value.charAt(0).toUpperCase()) ? 1 : -1)
    }

    /**
     * Dispatch sorted list for apparels and genders to redux store
     * @param filterAPIData
     */
    const dispatchSortList = (filterAPIData) => {
        if(filterAPIData) {
            let sortListPayload = {}
            sortListPayload.apparels = sortByObjValues(filterAPIData.apparels)
            sortListPayload.brands = sortByObjValues(filterAPIData.brands)

            dispatch({
                type: SAVE_SORT_LIST,
                payload: sortListPayload
            })
        }
    }

    useEffect(() => {
        log.info("[FilterNavBar] Component did mount for new URL hook")
        props.getDataViaAPI(LOAD_FILTER_ATTRIBUTES, FILTER_ATTRIBUTES_API, history.location.search, false)

        // eslint-disable-next-line
    }, [history.location.search]);

    useEffect(() => {

        let queryFromURL = history.location.search

        dispatchFilterAttributesFromURL(filterAttributes.data, queryFromURL)
        dispatchSortAttributeFromURL(filterAttributes.data, queryFromURL)
        dispatchPageAttributeFromURL(filterAttributes.data, queryFromURL)
        dispatchSortList(filterAttributes.data)

        if(resetFilter) {
            dispatch({
                type: CLEAR_ALL_FILTERS,
                payload: false
            })
        }

        // eslint-disable-next-line
    }, [filterAttributes])

    const renderDrawerComponents = (component) => {
        return (
            <>
                <Grid container direction="column" style={{paddingLeft: "1.5rem"}}>
                    {component}
                </Grid>

                <div style={{paddingTop: "0.5rem"}}>
                    <Divider/>
                </div>
            </>
        )
    }

    const drawer = (
        <>
            <Grid container alignItems="center" style={{
                position: 'sticky', top: 0, backgroundColor: 'white',
                fontWeight: "bold", fontSize: "1.2rem", zIndex: 1040,
                paddingTop: "1rem"
            }}>
                <Grid item sm={6} style={{paddingLeft: "1.5rem"}}>
                    FILTERS
                </Grid>
                <Grid item sm={6} style={{paddingLeft: "3rem"}}>
                    <ClearAllButton/>
                </Grid>
                <Grid item style={{height: "1px", width: "100%", paddingTop: "1rem"}}>
                    <Divider/>
                </Grid>
            </Grid>

            {renderDrawerComponents(<GenderRadioButton/>)}
            {renderDrawerComponents(<ApparelCheckBox/>)}
            {renderDrawerComponents(<BrandCheckBox/>)}
            {renderDrawerComponents(<PriceCheckBox/>)}
        </>
    );

    log.info("[FilterNavBar] Rendering FilterNavBar Component.")

    return (
        <div className={classes.root}>
            <nav className={classes.drawer}>
                <Hidden smDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open>
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}

export default connect(null, {loadFilterAttributes, getDataViaAPI})(FilterNavBar);
