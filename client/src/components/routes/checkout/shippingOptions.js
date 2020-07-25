import React from 'react';
import log from 'loglevel';
import {Divider, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import ContinueButton from "./continueButton";
import {connect, useDispatch, useSelector} from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import {useAddProductsToShoppingBag} from "../../../hooks/useAddProductsToShoppingBag";
import {getDataViaAPI} from "../../../actions";
import {SHIPPING_OPTION_CONFIRMED} from "../../../actions/types";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    formControlLabel: {
        width: "inherit"
    }
}));

function ShippingOptions(props) {
    const classes = useStyles();
    const shoppingBagProducts = useSelector(state => state.shoppingBagProductReducer)
    const dispatch = useDispatch()
    const [value, setValue] = React.useState('free');

    useAddProductsToShoppingBag(props.getDataViaAPI)

    const handleRadioBtnChange = (event) => {
        setValue(event.target.value);
    };

    const submitHandler = () => {
        dispatch({
            type: SHIPPING_OPTION_CONFIRMED,
            payload: {
                selectedOption: value,
                submitted: true
            }
        })
    }

    const renderRadioBtnLabel = (lblText, helperText, price) => {
        return (
            <Grid item container xs={12} sm={12} style={{width: "inherit", paddingTop: 20}}>

                <Grid item sm={5}>
                    <Grid item style={{fontWeight: "bolder", fontSize: "1.1rem"}}>
                        {lblText}
                    </Grid>
                    <Grid item>
                        {helperText}
                    </Grid>
                </Grid>

                <Grid item container justify="flex-end" xs={4} sm={6}
                      style={{fontWeight: "bolder", fontSize: "1.2rem"}}>
                    {price}
                </Grid>
            </Grid>
        )
    }

    const renderImages = () => {
        log.info(`shoppingBagProducts.hasOwnProperty("data") = ${shoppingBagProducts.hasOwnProperty("data")}`)
        if (!shoppingBagProducts.hasOwnProperty("data") || Object.keys(shoppingBagProducts.data).length === 0) {
            return <CircularProgress color="secondary"/>
        }

        log.info(`shoppingBagProducts.data = ${JSON.stringify(shoppingBagProducts.data)}`)
        let imageList = []

        for (const [id, product] of Object.entries(shoppingBagProducts.data)) {
            imageList.push(
                <Grid key={id} item sm={2} style={{alignSelf: "center", paddingBottom: "1rem"}}>
                    <img key={product.id} src={product.imageName}
                         alt={product.imageName} width="inherit" height={80}/>
                </Grid>
            )
        }

        return imageList
    }

    log.info("[ShippingOptions] Rendering ShippingOptions Component.")

    return (
        <Grid item style={{width: "100%", height: "fit-content"}}>
            <Grid item container sm={10} wrap="wrap"
                  style={{padding: "25px 0 0 30px", height: "fit-content"}}>
                {renderImages()}
            </Grid>
            <Grid item container sm={12} justify="center">
                <FormControl component="fieldset" style={{width: "inherit"}}>
                    <RadioGroup aria-label="delivery-option" name="delivery-option" value={value}
                                onChange={handleRadioBtnChange} style={{width: "inherit"}}>
                        <FormControlLabel value="free" control={<Radio style={{marginLeft: 15}}/>}
                                          style={{width: "inherit", margin: "inherit"}}
                                          classes={{label: classes.formControlLabel}}
                                          label={renderRadioBtnLabel("Everyday Free Shipping",
                                              "Transit time: 3-6 business days", "Free")}/>
                        <FormControlLabel value="premium" control={<Radio style={{marginLeft: 15}}/>}
                                          style={{width: "inherit", margin: "inherit"}}
                                          classes={{label: classes.formControlLabel}}
                                          label={renderRadioBtnLabel("Premium",
                                              "Transit time: 2-3 business days", "$10.00")}/>
                        <FormControlLabel value="express" control={<Radio style={{marginLeft: 15}}/>}
                                          style={{width: "inherit", margin: "inherit"}}
                                          classes={{label: classes.formControlLabel}}
                                          label={renderRadioBtnLabel("Express",
                                              "Transit time: 1-2 business days", "$15.00")}/>
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item container justify="center" sm={12}
                  style={{paddingTop: 20}}>
                <Divider style={{height: 1, width: "inherit"}}/>
            </Grid>

            <ContinueButton buttonHandler={submitHandler}/>
        </Grid>
    )
}

export default connect(null, {getDataViaAPI})(ShippingOptions);