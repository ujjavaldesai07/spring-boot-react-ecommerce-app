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
import Chip from '@material-ui/core/Chip';

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
        maxHeight: '80vh'
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        paddingTop: "85px",
    },
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
            <div style={{paddingLeft: '15px', paddingTop: '10px', paddingBottom: '8px'}}>
                <TitleHeader title={title} variant="subtitle1" fontWeight="bold" fontSize="1.2rem"/>
                <RadioButtonsGroup attributeList={attributeList} title={title.replace(/\s/g, '')}/>
            </div>
        )
    }

    const drawer = (
        <div>
            <Grid style={{position: "fixed", top: "80px", fontWeight: "bold",
                fontSize: "1.2rem", paddingLeft: "15px", zIndex: "1002"}}>
                <span>FILTERS</span>
                <Link to=".">
                    <span style={{paddingLeft: "65px", fontSize: "1rem", color: "red"}}>CLEAR ALL</span>
                </Link>
            </Grid>
            <Divider/>
            {renderRadioButtonGroup(filterAttributes.genderList, "Gender")}
            <Divider/>
            <FilterCheckBoxSection searchBar="true" title="Apparel" attrList={filterAttributes.clothesTypeList}/>
            <Divider/>
            <FilterCheckBoxSection searchBar="true" title="Brand" attrList={filterAttributes.brandList}/>
            <Divider/>
            <FilterCheckBoxSection title="Price" attrList={filterAttributes.priceRangeCategoryList}/>
            <Divider/>
        </div>
    );

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <Grid container style={{padding: '20px 50px 30px 40px',
                backgroundColor: "white", position: "fixed", zIndex: "1001"}}
                  justify="flex-end">
                <Grid item md={8}>
                    <Chip label="Deletable primary" onDelete={handleDelete} color="primary" />
                </Grid>
                <Grid item md={2}>
                    <DropdownSection options={filterAttributes.sortByCategoryList}/>
                </Grid>
            </Grid>
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
                <FilterProductsDisplay/>
            </main>
        </div>
    );
}

export default connect(null, {loadFilterAttributes})(FilterAttributesBar);
