import React, {useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import TitleHeader from "../../../ui/titleHeader";
import ApparelCheckBox from "./apparelCheckBox";
import log from "loglevel";
import GenderRadioButton from "./genderRadioButton";
import BrandCheckBox from "./brandCheckBox";
import PriceCheckBox from "./priceCheckBox";
import ClearAllButton from "./clearAllButton";
import {filterAttributesReducer} from "../../../../reducers/screens/filter/filterScreenReducer";
import {connect, useSelector} from "react-redux";
import {loadFilterAttributes, loadProducts} from "../../../../actions";
import {Box} from "@material-ui/core";
import {useFilterNavBarStyles} from "../../../../styles/materialUI/filterNavbar";

function FilterNavbar(props) {
    const {window} = props
    const classes = useFilterNavBarStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const filterAttributes = useSelector(state => state.filterAttributesReducer)

    // load product attributes from API
    useEffect(() => {
        log.info("[FilterNavbar] Component did mount and filter attributes API is called.")

        // if filter attributes exist then we dont want to call the API again
        // unless user tries to reload the page.
        if (filterAttributes) {
            return
        }
        props.loadFilterAttributes();

        // eslint-disable-next-line
    }, [filterAttributesReducer]);

    const handleDrawerToggle = () => {
        log.debug(`[FilterNavBar] handleDrawerToggle is called`)
        setMobileOpen(!mobileOpen);
    };

    const renderDrawerComponents = (title, component) => {
        return (
            <>
                <Box display="flex" flexDirection="column" p={2}>
                    <Box>
                        <TitleHeader title={title} variant="subtitle1" fontWeight="bold" fontSize="1.2rem"/>
                    </Box>
                    <Box>
                        {component}
                    </Box>
                </Box>
                <Divider/>
            </>
        )
    }

    const drawer = (
        <>
            <Box display="flex" p={2} style={{fontWeight: "bold", fontSize: "1.2rem"}}>
                <Box alignSelf="center" flex="1">FILTERS</Box>
                <Box alignSelf="center"><ClearAllButton/></Box>
            </Box>
            <Divider/>

            {renderDrawerComponents("Gender", <GenderRadioButton/>)}
            {renderDrawerComponents("Apparel", <ApparelCheckBox/>)}
            {renderDrawerComponents("Brand", <BrandCheckBox/>)}
            {renderDrawerComponents("Price", <PriceCheckBox/>)}
        </>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    log.info("[FilterNavbar] Rendering FilterNavbar Component.")

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <nav className={classes.drawer}>
                <Hidden mdDown implementation="css">
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

export default connect(null, {loadFilterAttributes, loadProducts})(FilterNavbar);
