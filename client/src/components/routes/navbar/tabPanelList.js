import React from 'react';
import useTabStyles from "../../../styles/materialUI/tabStyles";
import {useDispatch, useSelector} from 'react-redux';
import log from "loglevel";
import {Link} from "react-router-dom";
import {MAX_PRODUCTS_PER_PAGE, TAB_CONFIG} from "../../../constants/constants";
import {Box} from "@material-ui/core";
import {HANDLE_TAB_HOVER_EVENT} from "../../../actions/types";
import {BadRequest} from "../../ui/error/badRequest";
import Paper from "@material-ui/core/Paper";

function TabPanel(props) {
    const {value, index} = props;
    const classes = useTabStyles();
    const dispatch = useDispatch();
    const tabsData = useSelector(state => state.tabsDataReducer.data)

    const renderDataList = (brandList, queryParam) => {
        return brandList.map(({id, value}) => {
            return (
                <Link key={id} to={`/products?q=${queryParam}=${id}::page=0,${MAX_PRODUCTS_PER_PAGE}`}
                      onClick={mouseLeaveHandler}>
                    <Box pt={1.5} css={{color: "#282c3f", fontWeight: 500,
                        fontSize: '15px', fontFamily: 'Arial, Helvetica, sans-serif'}}>
                        {value}
                    </Box>
                </Link>
            )
        })
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
        if(!brandList) {
            log.info(`[TabPanel]: brandList is null = ${brandList}`)
            return <BadRequest/>
        } else if(!apparelList) {
            log.info(`[TabPanel]: apparelList is null = ${apparelList}`)
            return <BadRequest/>
        }

        return (
            <Paper square className={classes.paperRoot} onMouseLeave={mouseLeaveHandler}
                   style={{left: `${index * 70 + 185}px`}}>
                <Box display="flex" flexDirection="column" flexWrap="wrap" p={1} pl={4}>
                    <Box pt={0.75} css={{color: TAB_CONFIG[index].color, fontWeight: "bold",
                        fontSize: '15px', fontFamily: 'Arial, Helvetica, sans-serif'}}>
                        Top Brands
                    </Box>
                    {renderDataList(brandList, "brands")}
                    <Box pt={0.75} css={{color: TAB_CONFIG[index].color, fontWeight: "bold",
                        fontSize: '15px', fontFamily: 'Arial, Helvetica, sans-serif'}}>
                        Top Categories
                    </Box>
                    {renderDataList(apparelList, "apparels")}
                </Box>
            </Paper>
        )
    }

    if(isNaN(index)) {
        return
    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tab-${index}`}
            aria-labelledby={`simple-tab-${index}`}>
            {
                value === index &&
                renderTabPanel(tabsData[TAB_CONFIG[index].mapKey].brands,
                    tabsData[TAB_CONFIG[index].mapKey].apparels)
            }
        </div>
    );
}

export const TabPanelList = () => {
    const classes = useTabStyles();
    const {index} = useSelector(state => state.tabHoverEventReducer);

    if (index === -1) {
        log.debug(`[TabPanelList]: index is null`)
        return null;
    }

    const renderTabPanels = () => {
        return TAB_CONFIG.map((conf) => {
            return <TabPanel key={conf.index} value={index} index={conf.index}/>
        })
    }

    log.info(`[TabPanelList]: Rendering TabPanelList Component with index = ${index}`)
    return (
        <div className={classes.root}>
            {renderTabPanels()}
        </div>
    );
}