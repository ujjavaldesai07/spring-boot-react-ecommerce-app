import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import useTabStyles from "../../../styles/materialUI/tabStyles";
import {useSelector} from 'react-redux';
import log from "loglevel";

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    const classes = useTabStyles();
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tab-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>
                    <Paper square className={classes.paperRoot}>
                        Ujjaval Ujjaval Ujjaval
                        Ujjaval Ujjaval Ujjaval
                        Ujjaval Ujjaval Ujjaval
                    </Paper>
                    <Paper square className={classes.paperRoot}>
                        Ujjaval Ujjaval Ujjaval
                        Ujjaval Ujjaval Ujjaval
                        Ujjaval Ujjaval Ujjaval
                    </Paper>
                </div>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default function TabPanelList() {
    const classes = useTabStyles();
    const {index} = useSelector(state => state.tabHoverEventReducer);

    if (index === -1) {
        log.debug(`[TabPanelList]: index is null`)
        return null;
    }

    log.info(`[TabPanelList]: Rendering TabPanelList Component with index = ${index}`)
    return (
        <div className={classes.root}>
            <TabPanel value={index} index={0}>
                Item One Panel
            </TabPanel>
            <TabPanel value={index} index={1}>
                Item Two Panel
            </TabPanel>
            <TabPanel value={index} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={index} index={3}>
                Item Four
            </TabPanel>
        </div>
    );
}
