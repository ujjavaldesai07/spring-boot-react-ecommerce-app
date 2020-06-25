import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import {makeStyles, useTheme} from '@material-ui/core/styles';

import RadioButtonsGroup from "../../ui/radioButtonGroup";
import TitleHeader from "../../ui/titleHeader";
import {connect, useDispatch, useSelector} from "react-redux";
import {loadFilterAttributes, loadProducts} from "../../../actions";
import FilterCheckBoxSection from "./filterCheckBoxSection";
import Button from '@material-ui/core/Button';
import {SELECT_FILTER_ATTRIBUTES} from "../../../actions/types";
import log from "loglevel";

const drawerWidth = 240;
const CheckBoxGroup = {
    APPAREL: 1,
    BRAND: 2,
    PRICE: 3
}

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
    const {window} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const selectedFilterAttributes = useSelector(state => state.selectedFilterAttributesReducer)
    const dispatch = useDispatch()
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

    // useEffect(() => {
    //     props.loadFilterAttributes();
    // }, [props]);

    if (!filterAttributes) {
        log.debug(`[FilterNavBar] filterAttributes is null`)
        return null
    }

    const handleDrawerToggle = () => {
        log.debug(`[FilterNavBar] handleDrawerToggle is called`)
        setMobileOpen(!mobileOpen);
    };

    const handleClearAllClick = () => {
        log.debug(`[FilterNavBar] handleClearAllClick is called`)
        dispatch({
            type: SELECT_FILTER_ATTRIBUTES,
            payload: {
                clearAll: true
            }
        })
    }

    const handleRadioButtonChange = searchValue => {
        log.debug(`[FilterNavBar] handleRadioButtonChange searchValue = ${searchValue}`)
        for(let i = 0; i < filterAttributes.genders.length; i++) {
            if(searchValue.charAt(0).localeCompare(filterAttributes.genders[i].type.charAt(0)) === 0
                && searchValue.localeCompare(filterAttributes.genders[i].type) === 0) {

                log.debug(`[FilterNavBar] handleRadioButtonChange id = ${filterAttributes.genders[i].id}`)

                dispatch({
                    type: SELECT_FILTER_ATTRIBUTES,
                    payload: {
                        gender: [filterAttributes.genders[filterAttributes.genders[i].id - 1].id]
                    }
                })
                return
            }
        }
    }

    const handleCheckBoxChange = (value, checkBoxGroupId) => {
        log.debug(`[FilterNavBar] handleCheckBoxChange value = ${value}, checkBoxGroupId= ${checkBoxGroupId}`)
        switch (checkBoxGroupId) {
            case CheckBoxGroup.APPAREL:
                dispatch({
                    type: SELECT_FILTER_ATTRIBUTES,
                    payload: {
                        apparel: filterAttributes.apparels[value - 1].id
                    }
                })
                break
            case CheckBoxGroup.BRAND:
                dispatch({
                    type: SELECT_FILTER_ATTRIBUTES,
                    payload: {
                        brand: filterAttributes.brands[value - 1].id
                    }
                })
                break
            case CheckBoxGroup.PRICE:
                dispatch({
                    type: SELECT_FILTER_ATTRIBUTES,
                    payload: {
                        price: filterAttributes.priceRanges[value - 1].id
                    }
                })
                break
            default:
                throw new Error("Unknown Checkbox GroupId")
        }
    }

    const drawer = (
        <div>
            <div style={{
                fontWeight: "bold",
                fontSize: "1.2rem", padding: "10px 0 10px 15px"
            }}>
                <span>FILTERS</span>
                <span style={{paddingLeft: "65px"}}>
                        <Button onClick={handleClearAllClick} style={{fontWeight: "bold"}}
                                color="secondary">CLEAR ALL</Button>
                    </span>
            </div>
            <Divider/>
            <div style={{padding: '10px 0 8px 15px'}}>
                <TitleHeader title="Gender" variant="subtitle1" fontWeight="bold" fontSize="1.2rem"/>
                <RadioButtonsGroup onChangeHandler={handleRadioButtonChange}
                                   attrList={
                                       // eslint-disable-next-line array-callback-return
                                       filterAttributes.genders.filter(obj => {
                                       if(obj.id < 5) {
                                           return obj
                                       }
                                   })}
                                   selectedValue={selectedFilterAttributes.gender.length > 0 ?
                                       filterAttributes.genders[selectedFilterAttributes.gender[0] - 1].type: false}
                                   title="Gender"/>
            </div>
            <Divider/>
            <FilterCheckBoxSection onChangeHandler={handleCheckBoxChange}
                                   searchBar="true"
                                   title="Apparel"
                                   checkBoxGroupId={CheckBoxGroup.APPAREL}
                                   selectedAttributeList={selectedFilterAttributes.apparel}
                                   attrList={filterAttributes.apparels}/>
            <Divider/>
            <FilterCheckBoxSection onChangeHandler={handleCheckBoxChange}
                                   searchBar="true"
                                   title="Brand"
                                   checkBoxGroupId={CheckBoxGroup.BRAND}
                                   selectedAttributeList={selectedFilterAttributes.brand}
                                   attrList={filterAttributes.brands}/>
            <Divider/>
            <FilterCheckBoxSection onChangeHandler={handleCheckBoxChange}
                                   title="Price"
                                   checkBoxGroupId={CheckBoxGroup.PRICE}
                                   selectedAttributeList={selectedFilterAttributes.price}
                                   attrList={filterAttributes.priceRanges}/>
            <Divider/>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    log.debug(`[FilterNavBar] selectedFilterAttributes = ${JSON.stringify(selectedFilterAttributes)}`)
    log.info("[FilterNavBar] Rendering FilterNavBar Component.")

    return (
        <div className={classes.root}>
            {/*<Grid container style={{padding: '20px 50px 30px 40px',*/}
            {/*    backgroundColor: "white", position: "fixed", zIndex: "1001"}}*/}
            {/*      justify="flex-end">*/}
            {/*    <Grid item md={2}>*/}
            {/*        <DropdownSection options={filterAttributes.sortByCategoryList}/>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
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

export default connect(null, {loadFilterAttributes, loadFilterProducts: loadProducts})(FilterNavBar);
