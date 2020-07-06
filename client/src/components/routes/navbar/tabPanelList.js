import React from 'react';
import useTabStyles from "../../../styles/materialUI/tabStyles";
import {useSelector} from 'react-redux';
import log from "loglevel";
import TabPanel from "./TabPanel";

export const TabPanelList = () => {
    const classes = useTabStyles();
    const {index, tabColor} = useSelector(state => state.tabHoverEventReducer);

    if (index === -1) {
        log.debug(`[TabPanelList]: index is null`)
        return null;
    }

    log.info(`[TabPanelList]: Rendering TabPanelList Component with index = ${index}`)
    return (
        <div className={classes.root}>
            <TabPanel value={index} index={0} tabColor={tabColor}>
                Item One Panel
            </TabPanel>
            <TabPanel value={index} index={1} tabColor={tabColor}>
                Item Two Panel
            </TabPanel>
            <TabPanel value={index} index={2} tabColor={tabColor}>
                Item Three
            </TabPanel>
            <TabPanel value={index} index={3} tabColor={tabColor}>
                Item Four
            </TabPanel>
            <TabPanel value={index} index={4} tabColor={tabColor}>
                Item Five
            </TabPanel>
        </div>
    );
}