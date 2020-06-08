import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useTabStyles from "../styles/tabStyles";
import {useDispatch, useSelector} from 'react-redux';
import {TAB_CLICK} from "../actions/types";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function TabList() {
    const classes = useTabStyles();
    const dispatch = useDispatch();
    let {index} = useSelector(state => state.tab);

    const tabsConfig = [
        {index: 0, label: 'MEN', style: classes.tabRoot, color: '#ee5f73'},
        {index: 1, label: 'WOMEN', style: classes.tabRoot, color: '#fb56c1'},
        {index: 2, label: 'KIDS', style: classes.tabRoot, color: '#f26a10'},
        {index: 3, label: 'ESSENTIALS', style: classes.tabRoot, color: '#0db7af'},
        {index: 4, label: 'HOME & LIVING', style: classes.tabRoot, color: '#f2c210'},
    ];

    const renderTabs = () => {
        return tabsConfig.map(({index, label, style}) => {
            return <Tab key={index} label={label} onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className={style} {...a11yProps(index)}/>
        })
    }

    const handleMouseEnter = (event) => {
        dispatch({type: TAB_CLICK, payload: {index: parseInt(event.target.id.split('-')[2]), hover: true}});
    }

    const handleMouseLeave = () => {
        dispatch({type: TAB_CLICK, payload: {index: false, hover: false}});
    }

    // Sometimes a race condition occurs with spit out index as NAN
    // So reset the value of index to default
    if (isNaN(index)) {
        index = false;
    }

    return (
        <Tabs style={{paddingTop: '10px'}} value={index}
              aria-label="simple-tabs"
              centered
              TabIndicatorProps={{
                  style: {
                      backgroundColor: index === false? 'none': tabsConfig[index].color,
                      height: '4px'
                  }
              }}
              classes={{root: classes.tabFlexContainer}}
        >
            {renderTabs()}
        </Tabs>
    );
}
