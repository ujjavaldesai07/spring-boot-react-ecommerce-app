import React, {useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import useTabStyles from "../../../styles/materialUI/tabStyles";
import {useDispatch, useSelector} from 'react-redux';
import log from "loglevel";
import {HANDLE_TAB_HOVER_EVENT,} from "../../../actions/types";
import {Box} from "@material-ui/core";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {loadTabsData} from "../../../actions"
import {tabsDataReducer} from "../../../reducers/screens/commonScreenReducer";
import {MAX_PRODUCTS_PER_PAGE} from "../../../constants/constants";
import {Fade} from '@material-ui/core';

const tabConfig = {
    0: "women",
    1: "men",
    2: "boys",
    3: "essentials",
    4: "homeAndLiving",
}

function TabPanel(props) {
    const {value, index, tabColor} = props;
    const classes = useTabStyles();
    const dispatch = useDispatch();
    const tabsData = useSelector(state => state.tabsDataReducer ? state.tabsDataReducer : null)

    useEffect(() => {
        log.info("[TabPanel] Component will mount...")
        props.loadTabsData()
    }, [tabsDataReducer])

    if (!tabsData) {
        log.info(`[TabPanel]: tabsData is null`)
        return null
    }

    const mouseLeaveHandler = () => {
        log.info(`[TabPanel]: dispatching HANDLE_TAB_HOVER_EVENT with index and hover as false`)
        dispatch({
            type: HANDLE_TAB_HOVER_EVENT, payload: {
                index: false,
                hover: false
            }
        })
    }

    const renderTabPanel = (brandList, apparelList) => {
        return (
            <Paper square className={classes.paperRoot} onMouseLeave={mouseLeaveHandler}>
                <Box display="flex" flexDirection="column" flexWrap="wrap" p={2} pl={4}>
                    <Box pt={0.75} pb={1} css={{color: tabColor, fontWeight: "bold"}}>
                        Top Brands
                    </Box>
                    {renderDataList(brandList, "brands")}
                    <Box pb={1} css={{color: tabColor, fontWeight: "bold"}}>
                        Categories
                    </Box>
                    {renderDataList(apparelList, "apparels")}
                </Box>
            </Paper>
        )
    }

    const renderDataList = (brandList, queryParam) => {
        return brandList.map(({id, value}) => {
            return (
                <Link key={id} to={`/products?q=${queryParam}=${id}::page=0,${MAX_PRODUCTS_PER_PAGE}`}>

                    <Box pt={0.75} css={{color: "#282c3f", fontWeight: 500}}>
                        {value}
                    </Box>
                </Link>
            )
        })
    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tab-${index}`}
            aria-labelledby={`simple-tab-${index}`}>
            {
                value === index &&
                renderTabPanel(tabsData[tabConfig[index]].brands, tabsData[tabConfig[index]].apparels)
            }
        </div>
    );
}

export default connect(null, {loadTabsData})(TabPanel);