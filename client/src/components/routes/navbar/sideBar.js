import React, {useRef} from "react";
import {makeStyles} from "@material-ui/core/styles";
import AccordionSection from "./accordionSection";
import Drawer from "@material-ui/core/Drawer";
import log from 'loglevel';
import {useClickAway} from "../../../hooks/useClickAway";

export const useSideBarStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: 280,
            flexShrink: 0,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        position: "fixed",
        overflow: 'auto',
        backgroundColor: "#fff",
        [theme.breakpoints.up('xs')]: {
            width: 280,
        },
        [theme.breakpoints.up('sm')]: {
            width: 400,
        },
    },
}));

const SideBar = (props) => {
    const classes = useSideBarStyles();
    const wrapperRef = useRef(null);

    useClickAway(wrapperRef, props.closeHandler);

    log.info(`[SideBar] Rendering SideBar`)
    return (
        <div className={classes.root}>
            <nav className={classes.drawer}>
                <div id={`sidebar-drawer`} ref={wrapperRef}>
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="temporary"
                    open={props.open}>
                    <AccordionSection/>
                </Drawer>
                </div>
            </nav>
        </div>
    );
}

export default SideBar;