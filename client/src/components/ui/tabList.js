import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useTabStyles from "../../styles/materialUI/tabStyles";
import {useDispatch, useSelector} from 'react-redux';
import {HANDLE_TAB_HOVER_EVENT} from "../../actions/types";
import log from "loglevel";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function TabList() {
    const classes = useTabStyles();
    const dispatch = useDispatch();
    let {index} = useSelector(state => state.tabHoverEventReducer);

    const tabsConfig = [
        {index: 0, label: 'MEN', style: classes.tabRoot, color: '#ee5f73'},
        {index: 1, label: 'WOMEN', style: classes.tabRoot, color: '#fb56c1'},
        {index: 2, label: 'KIDS', style: classes.tabRoot, color: '#f26a10'},
        {index: 3, label: 'ESSENTIALS', style: classes.tabRoot, color: '#0db7af'},
        {index: 4, label: 'HOME & LIVING', style: classes.tabRoot, color: '#f2c210'},
    ];

    const renderTabs = () => {
        log.debug(`[TabList]: renderTabs is invoked`)
        return tabsConfig.map(({index, label, style}) => {
            log.trace(`[TabList]: renderTabs index = ${index}, label = ${label}, style = ${style}`)
            return <Tab key={index} label={label} onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className={style} {...a11yProps(index)}/>
        })
    }

    const handleMouseEnter = (event) => {
        log.debug(`[TabList]: dispatching HANDLE_TAB_HOVER_EVENT with
         index = ${parseInt(event.target.id.split('-')[2])} and hover = true`)

        dispatch({
            type: HANDLE_TAB_HOVER_EVENT,
            payload: {
                index: parseInt(event.target.id.split('-')[2]),
                hover: true
            }
        });
    }

    const handleMouseLeave = () => {
        log.debug(`[TabList]: dispatching HANDLE_TAB_HOVER_EVENT with index and hover as false`)
        dispatch({
            type: HANDLE_TAB_HOVER_EVENT, payload: {
                index: false,
                hover: false
            }
        });
    }

    // Sometimes a race condition occurs which spits out the index as NAN
    // So reset the value of index to default
    if (isNaN(index)) {
        log.debug(`[TabList]: index is null and is set to false`)
        index = false;
    }

    log.info(`[TabList]: Rendering TabList Component`)
    return (
        <Tabs style={{paddingTop: '10px'}} value={index}
              aria-label="simple-tabs"
              centered
              TabIndicatorProps={{
                  style: {
                      backgroundColor: index === false ? 'none' : tabsConfig[index].color,
                      height: '4px'
                  }
              }}
              classes={{root: classes.tabFlexContainer}}
        >
            {renderTabs()}
        </Tabs>
    );
};
