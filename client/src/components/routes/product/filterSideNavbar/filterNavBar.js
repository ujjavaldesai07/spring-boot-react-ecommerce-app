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
import {loadFilterAttributes} from "../../../../actions";
import {Grid} from "@material-ui/core";
import {useFilterNavBarStyles} from "../../../../styles/materialUI/filterNavBarStyles";
import {
    FILTER_ATTRIBUTES, MAX_PRODUCTS_PER_PAGE,
    PAGE_ATTRIBUTE, SORT_ATTRIBUTE
} from "../../../../constants/constants";
import {
    ADD_SELECTED_CATEGORY, LOAD_SELECTED_CATEGORY_FROM_URL,
    SAVE_QUERY_STATUS, SAVE_SORT_LIST, SELECT_PRODUCT_PAGE, SELECT_SORT_CATEGORY,
} from "../../../../actions/types";
import {PRODUCTS_ROUTE} from "../../../../constants/react_routes";

function FilterNavBar(props) {
    const classes = useFilterNavBarStyles();
    const selectedGenders = useSelector(state => state.selectedFilterAttributesReducer.genders)
    const selectedApparels = useSelector(state => state.selectedFilterAttributesReducer.apparels)
    const selectedBrands = useSelector(state => state.selectedFilterAttributesReducer.brands)
    const selectedPriceRanges = useSelector(state => state.selectedFilterAttributesReducer.prices)
    const selectedFilterAttributes = useSelector(state => state.selectedFilterAttributesReducer)
    const selectedSort = useSelector(state => state.selectSortReducer)
    const selectedPage = useSelector(state => state.selectPageReducer)
    const dispatch = useDispatch()
    const [loadOnlyProducts, setLoadOnlyProducts] = useState(false)

    /**
     * multiple selected options IDs are appended
     * which will work like OR condition
     *
     * @param attrList
     * @returns {string|null}
     */
    const appendQueryIds = attrList => {
        let selectedList = []

        if (attrList.length > 0) {
            attrList.forEach(({id}) => {
                selectedList.push(id)
            })
            return selectedList.join()
        }
        return null
    }

    /**
     * prepare query from the selected option in redux store
     *
     * @returns {string|null}
     */
    const prepareQuery = () => {
        log.info("[FilterNavBar] Preparing Query from filters.")

        let query = []
        let executeDefaultQuery = true

        if (selectedGenders.length > 0) {
            executeDefaultQuery = false
            query.push(`genders=${selectedGenders[0].id}`)
        }

        let idList = appendQueryIds(selectedApparels)
        if (idList) {
            executeDefaultQuery = false
            query.push(`apparels=${appendQueryIds(selectedApparels)}`)
        }

        idList = appendQueryIds(selectedBrands)
        if (idList) {
            executeDefaultQuery = false
            query.push(`brands=${appendQueryIds(selectedBrands)}`)
        }

        idList = appendQueryIds(selectedPriceRanges)
        if (idList) {
            query.push(`prices=${appendQueryIds(selectedPriceRanges)}`)
        }

        if (selectedSort.id > 1) {
            query.push(`sortby=${selectedSort.id}`)
        }

        if (selectedPage) {
            query.push(`page=${(selectedPage.pageNumber - 1) * MAX_PRODUCTS_PER_PAGE},${MAX_PRODUCTS_PER_PAGE}`)
        }

        if (executeDefaultQuery) {
            query.push("category=all")
        }

        if (query.length > 0) {
            query = query.join("::")
            log.info(`[FilterNavBar] query is prepared successfully query = ${query}`)
            return `?q=${query}`
        }
        return null
    }

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
        if (history.location && history.location.pathname.localeCompare(PRODUCTS_ROUTE) === 0) {

            let selectedFilterAttributes = {}

            // eg: http://localhost:7071/products?q=sortby=3::page=16,16::category=all
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

            selectedFilterAttributes = {
                ...selectedFilterAttributes,
                oldQuery: queryFromURL, newQuery: queryFromURL
            }

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
        if (queryParameters.length > 1) {
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
        if (queryParameters.length > 1) {
            let id = queryParameters[1].split(",")
            if (id.length > 1) {
                try {
                    let pageNo = parseInt(id[0])
                    log.info(`pageNo = ${pageNo}`)
                    dispatch({
                        type: SELECT_PRODUCT_PAGE,
                        payload: {
                            pageNumber: pageNo > 0 ? pageNo / MAX_PRODUCTS_PER_PAGE + 1 : 1,
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
     * @param filterAttr
     */
    const dispatchSortList = (filterAttr) => {
        let sortListPayload = {}
        sortListPayload.apparels = sortByObjValues(filterAttr.apparels)
        sortListPayload.brands = sortByObjValues(filterAttr.brands)

        dispatch({
            type: SAVE_SORT_LIST,
            payload: sortListPayload
        })
    }

    /**
     * Component Did Update for Genders, Apparels, Brands and Prices
     */
    useEffect(() => {
        log.info("[FilterNavBar] Component did mount for filter selection hook")

        const {oldQuery, newQuery} = selectedFilterAttributes;

        // this means we are seeing new URL
        if (!oldQuery || (oldQuery && oldQuery.localeCompare(newQuery) === 0)) {
            return
        }

        let queryFromURL = history.location.search

        log.info(`[FilterNavBar] filter selection hook oldQuery = ${oldQuery}, newQuery = ${newQuery}, queryFromURL = ${queryFromURL}`)
        if (!newQuery) {
            log.info(`[FilterNavBar] updating states for filter selection hook`)

            // on filter selection scenario
            let queryPreparedFromFilters = prepareQuery()

            props.loadFilterAttributes(queryPreparedFromFilters).then(data => {
                if(!data) {
                    log.error(`[FilterNavBar]  loadFilterAttributes failed. No data found.`)
                    return
                }

                dispatchSortList(data)
                // set new query
                dispatch({
                    type: ADD_SELECTED_CATEGORY,
                    payload: {newQuery: queryPreparedFromFilters}
                })

                // by default first page should be selected.
                if (selectedPage.pageNumber > 1) {
                    log.info(`[FilterNavBar] filter selection hook dispatching selectedPage = ${JSON.stringify(selectedPage)}`)

                    dispatch({
                        type: SELECT_PRODUCT_PAGE,
                        payload: {
                            pageNumber: 1,
                            maxProducts: MAX_PRODUCTS_PER_PAGE,
                            isLoadedFromURL: false
                        }
                    })
                } else {
                    log.info(`[FilterNavBar] filter selection hook dispatching SAVE_QUERY_STATUS = ${queryPreparedFromFilters}`)
                    dispatch({
                        type: SAVE_QUERY_STATUS,
                        payload: queryPreparedFromFilters
                    })
                }
            })
        }

        // eslint-disable-next-line
    }, [selectedFilterAttributes]);

    useEffect(() => {
        log.info("[FilterNavBar] Component did mount for new URL hook")

        const {oldQuery, newQuery} = selectedFilterAttributes;

        let queryFromURL = history.location.search

        log.info(`[FilterNavBar] new URL hook oldQuery = ${oldQuery}, newQuery = ${newQuery}, queryFromURL = ${queryFromURL}`)

        if(loadOnlyProducts) {
            setLoadOnlyProducts(false)
            return
        }

        if (!oldQuery || newQuery.localeCompare(queryFromURL) !== 0) {
            log.info(`[FilterNavBar] updating states for new URL hook`)

            // on links click from tabs
            props.loadFilterAttributes(queryFromURL).then(data => {
                if(!data) {
                    log.error(`[FilterNavBar]  loadFilterAttributes failed. No data found.`)
                    return
                }

                dispatchFilterAttributesFromURL(data, queryFromURL)
                dispatchSortAttributeFromURL(data, queryFromURL)
                dispatchPageAttributeFromURL(data, queryFromURL)
                dispatchSortList(data)
                dispatch({
                    type: SAVE_QUERY_STATUS,
                    payload: queryFromURL
                })
            })
        }

        // eslint-disable-next-line
    }, [props]);

    /**
     * Component Did Update for Sort and Page Options
     */
    useEffect(() => {
        log.info("[FilterNavBar] Component did mount selectedPage, selectedSort hook.")

        if (!selectedPage.isLoadedFromURL || !selectedSort.isLoadedFromURL) {
            log.info(`[FilterNavBar] updating states for selectedPage, selectedSort hook`)

            let query = prepareQuery()
            log.info(`[FilterNavBar] selectedPage, selectedSort hook dispatchQueryForProducts = ${query}`)

            if (query) {
                setLoadOnlyProducts(true)

                dispatch({
                    type: SAVE_QUERY_STATUS,
                    payload: query
                })
            }
        }

        // eslint-disable-next-line
    }, [selectedPage, selectedSort]);

    // if no filter attributes then just return no
    // need to render the component.
    if (!selectedFilterAttributes.newQuery
        && selectedFilterAttributes.newQuery === selectedFilterAttributes.oldQuery) {
        log.info(`[FilterNavBar] Stop rendering... newQuery = ${selectedFilterAttributes.newQuery}`
            + `, oldQuery = ${selectedFilterAttributes.oldQuery}`)
        return null
    }

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

export default connect(null, {loadFilterAttributes})(FilterNavBar);
