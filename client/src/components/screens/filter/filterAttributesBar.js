import React, {useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Grid from "@material-ui/core/Grid";
import {makeStyles, useTheme} from '@material-ui/core/styles';

import RadioButtonsGroup from "../../parts/radioButton";
import TitleHeader from "../../parts/titleHeader";
import {connect, useSelector} from "react-redux";
import {loadFilterAttributes} from "../../../actions";
import FilterProductsDisplay from "./filterProductsDisplay";
import FilterCheckBoxSection from "./filterCheckBoxSection";
import DropdownSection from "../../parts/dropDown";
import {Link} from "react-router-dom";

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
        top: '120px',
        width: drawerWidth,
        position: "fixed",
    },
    content: {
        flexGrow: 1,
        paddingTop: "85px",
    },
    inputIconRoot: {
        backgroundColor: 'yellow',
    }
}));

function FilterAttributesBar(props) {
    const {window} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const filterAttributes = useSelector(state => state.filterAttributesReducer)

    // const handleSearchClick = () => {
    //     ReactDOM.render(
    //         <div id="myNewGridId">
    //             <Grid container style={{paddingTop: '10px', paddingLeft: '10px'}}>
    //                 <Grid item xs={5}>
    //                     <CollapsableSearch handleOnClick={handleSearchClick}/>
    //                 </Grid>
    //             </Grid>
    //         </div>
    //         , document.getElementById('myGridId'));
    // }
    //
    // useEffect(() => {
    //
    //     // componentWillUnmount
    //     return () => {
    //         ReactDOM.unmountComponentAtNode(document.getElementById('myGridId'));
    //     };
    // })

    useEffect(() => {
        props.loadFilterAttributes();
    }, [props]);

    if (!filterAttributes) {
        return null
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const renderRadioButtonGroup = (attributeList, title) => {
        return (
            <>
                <Divider/>
                <div style={{paddingLeft: '15px', paddingTop: '10px'}}>
                    <TitleHeader title={title} variant="subtitle1" fontWeight="bold" fontSize="1.2rem"/>
                    <RadioButtonsGroup attributeList={attributeList} title={title.replace(/\s/g, '')}/>
                </div>
            </>
        )
    }

    const drawer = (
        <div>
            {renderRadioButtonGroup(filterAttributes.genderList, "Gender")}
            <FilterCheckBoxSection title="Apparel" attrList={filterAttributes.clothesTypeList}/>
            <Divider/>
            <FilterCheckBoxSection title="Brand" attrList={filterAttributes.brandList}/>
            {/*<CheckboxList/>*/}
            <Divider/>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <Grid container style={{padding: '20px 10px 30px 0', backgroundColor: "white", position: "fixed"}}
                  justify="flex-end">
                <Grid item md={2}>
                    <DropdownSection options={filterAttributes.sortByCategoryList}/>
                </Grid>
            </Grid>
            <Grid style={{position: "fixed", top: "80px", fontWeight: "bold", fontSize: "1.2rem", paddingLeft: "15px"}}>
                <span>FILTERS</span>
                <Link to=".">
                    <span style={{paddingLeft: "65px", fontSize: "1rem", color: "red"}}>CLEAR ALL</span>
                </Link>
            </Grid>
            <CssBaseline/>
            <nav className={classes.drawer}>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <Grid container spacing={0} style={{padding: '10px 0 0 30px'}}>
                    <FilterProductsDisplay/>
                </Grid>
            </main>
        </div>
    );
}

export default connect(null, {loadFilterAttributes})(FilterAttributesBar);
