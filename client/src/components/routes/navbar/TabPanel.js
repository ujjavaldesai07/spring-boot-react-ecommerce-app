import React from 'react';
import Paper from '@material-ui/core/Paper';
import useTabStyles from "../../../styles/materialUI/tabStyles";
import {useDispatch, useSelector} from 'react-redux';
import log from "loglevel";
import {HANDLE_TAB_HOVER_EVENT,} from "../../../actions/types";
import {Box} from "@material-ui/core";
import {Link} from "react-router-dom";
import {MAX_PRODUCTS_PER_PAGE} from "../../../constants/constants";
import {BadRequest} from "../../ui/error/badRequest";

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
    const tabsData = useSelector(state => state.tabsDataReducer.data)

    const renderDataList = (brandList, queryParam) => {
        return brandList.map(({id, value}) => {
            return (
                <Link key={id} to={`/products?q=${queryParam}=${id}::page=0,${MAX_PRODUCTS_PER_PAGE}`}>
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
                   style={{left: `${index * 70 + 130}px`}}>
                <Box display="flex" flexDirection="column" flexWrap="wrap" p={1} pl={4}>
                    <Box pt={0.75} css={{color: tabColor, fontWeight: "bold",
                        fontSize: '15px', fontFamily: 'Arial, Helvetica, sans-serif'}}>
                        Top Brands
                    </Box>
                    {renderDataList(brandList, "brands")}
                    <Box pt={0.75} css={{color: tabColor, fontWeight: "bold",
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
                renderTabPanel(tabsData[tabConfig[index]].brands, tabsData[tabConfig[index]].apparels)
            }
        </div>
    );
}

export default TabPanel;