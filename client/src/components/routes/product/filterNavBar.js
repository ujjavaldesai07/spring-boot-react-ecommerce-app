import React, {useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import {makeStyles, useTheme} from '@material-ui/core/styles';

import TitleHeader from "../../ui/titleHeader";
import ApparelCheckBox from "./apparelCheckBox";
import log from "loglevel";
import GenderRadioButton from "./genderRadioButton";
import BrandCheckBox from "./brandCheckBox";
import PriceCheckBox from "./priceCheckBox";
import Grid from "@material-ui/core/Grid";
import ClearAllButton from "./clearAllButton";
import filterAttributesReducer from "../../../reducers/screens/filter/filterAttributesReducer";
import {connect, useSelector} from "react-redux";
import {loadFilterAttributes, loadProducts} from "../../../actions";
import history from "../../../history";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
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
        top: '65px',
        width: drawerWidth,
        position: "fixed",
        maxHeight: '87vh'
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        paddingTop: "85px",
    },
}));

function FilterNavBar(props) {
    const {window} = props
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const filterAttributes = useSelector(state => state.filterAttributesReducer)

    // load product attributes from API
    useEffect(() => {
        log.info("[FilterNavBar] Component did mount and filter attributes API is called.")

        // if filter attributes exist then we dont want to call the API again
        // unless user tries to reload the page.
        if(filterAttributes) {
            return
        }
        props.loadFilterAttributes();

        // eslint-disable-next-line
    }, [filterAttributesReducer]);

    const handleDrawerToggle = () => {
        log.debug(`[FilterNavBar] handleDrawerToggle is called`)
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div style={{
                fontWeight: "bold",
                fontSize: "1.2rem", padding: "10px 0 10px 15px"
            }}>
                <span>FILTERS</span>
                <span style={{paddingLeft: "65px"}}>
                       <ClearAllButton/>
                    </span>
            </div>
            <Divider/>
            <div style={{padding: '10px 0 8px 15px'}}>
                <TitleHeader title="Gender" variant="subtitle1" fontWeight="bold" fontSize="1.2rem"/>
                <GenderRadioButton/>
            </div>
            <Divider/>
            <ApparelCheckBox/>
            <Divider/>
            <BrandCheckBox/>
            <Divider/>
            <Grid container style={{paddingTop: '10px'}}>
                <Grid item xs={1}/>
                <Grid item xs={6} style={{paddingTop: '2px'}}>
                    <TitleHeader title="Price" fontWeight="bold" fontSize="1.2rem"/>
                </Grid>
            </Grid>
            <PriceCheckBox/>
            <Divider/>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    log.info("[FilterNavBar] Rendering FilterNavBar Component.")

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}>
                        {/*{drawer}*/}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
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

export default connect(null, {loadFilterAttributes, loadProducts})(FilterNavBar);
