import React from 'react';
import log from 'loglevel';
import {Divider, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import ContinueButton from "./continueButton";
import {useDispatch, useSelector} from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    DELIVERY_CHARGES,
    SHIPPING_OPTION_CONFIRMED
} from "../../../actions/types";
import {MONTHS} from "../../../constants/constants";
import Button from "@material-ui/core/Button";

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

const deliveryPrices = {
    "free": 0,
    "premium": 10,
    "express": 15
}

const shippingOptionsData = {
    "free": {
        price: "Free",
        label: "Everyday Free Shipping",
        transitLabel: "Transit time: 3-6 business days",
        estimatedDays: [3, 6]
    },
    "premium": {
        price: `$${deliveryPrices.premium}.00`,
        label: "Premium",
        transitLabel: "Transit time: 2-3 business days",
        estimatedDays: [2, 3]
    },
    "express": {
        price: `$${deliveryPrices.express}.00`,
        label: "Express",
        transitLabel: "Transit time: 1-2 business days",
        estimatedDays: [1, 2]
    },
}

export function ShippingOptions() {
    const classes = useStyles();
    const shoppingBagProducts = useSelector(state => state.shoppingBagProductReducer)
    const dispatch = useDispatch()
    const [shippingOptionState, setShippingOptionState] = React.useState( {value: 'free', submitted: false})

    const handleRadioBtnChange = (event) => {
        log.info(`event.target.value = ${event.target.value}`)
        setShippingOptionState({value: event.target.value, submitted: false})

        let deliveryPrice = null

        switch (event.target.value) {
            case "free":
                deliveryPrice = deliveryPrices.free
                break
            case "premium":
                deliveryPrice = deliveryPrices.premium
                break
            case "express":
                deliveryPrice = deliveryPrices.express
                break
            default:
                log.error(`[ShippingOptions] Unexpected ShippingOptions value = ${event.target.value}`)
                return null
        }

        dispatch({
            type: DELIVERY_CHARGES,
            payload: deliveryPrice
        })
    };

    const submitHandler = () => {
        let selectedOption = shippingOptionState.value
        setShippingOptionState({value: selectedOption, submitted: true})

        dispatch({
            type: SHIPPING_OPTION_CONFIRMED,
            payload: {
                estimatedDate: getEstimatedDeliveryDate(shippingOptionsData[selectedOption].estimatedDays),
                price: shippingOptionsData[selectedOption].price,
                deliveryType: shippingOptionsData[selectedOption].label,
                submitted: true
            }
        })
    }

    const editBtnHandler = () => {
        setShippingOptionState({value: shippingOptionState.value, submitted: false})
    }

    const getEstimatedDeliveryDate = (estimatedDays) => {
        let startDate = new Date();
        let endDate = new Date();
        startDate.setDate(endDate.getDate() + estimatedDays[0]);
        endDate.setDate(endDate.getDate() + estimatedDays[1]);
        return `${startDate.getDate()} ${MONTHS[startDate.getMonth()]} &`
            + ` ${endDate.getDate()} ${MONTHS[endDate.getMonth()]}`
    }

    const renderEditButton = () => {
        return (
            <Grid item xs={3} style={{padding: "1rem 0 1rem 2rem"}}>
                <Button variant="outlined" color="inherit" fullWidth style={{
                    height: "3rem",
                    fontSize: "1rem"
                }} onClick={editBtnHandler}>
                    Edit
                </Button>
            </Grid>
        )
    }

    const renderSelectedOption = () => {
        return (
            <Grid item container xs={11}>
                {
                    renderRadioBtnLabel(shippingOptionsData[shippingOptionState.value].label,
                        shippingOptionsData[shippingOptionState.value].transitLabel,
                        shippingOptionsData[shippingOptionState.value].price,
                        shippingOptionsData[shippingOptionState.value].estimatedDays)
                }
            </Grid>
        )
    }

    const renderRadioBtnLabel = (lblText, helperText, price, estimatedDays) => {
        return (
            <Grid item container xs={12} sm={12} style={{width: "inherit", paddingTop: 20}}>

                <Grid item xs={7}>
                    <Grid item style={{fontWeight: "bolder", fontSize: "1.1rem"}}>
                        {lblText}
                    </Grid>
                    <Grid item>
                        {helperText}
                    </Grid>
                    <Grid item style={{fontWeight: "bold"}}>
                        {`Delivered between ${getEstimatedDeliveryDate(estimatedDays)}`}
                    </Grid>
                </Grid>

                <Grid item container justify="flex-end" xs={4} sm={4}
                      style={{fontWeight: "bolder", fontSize: "1.2rem"}}>
                    {price}
                </Grid>
            </Grid>
        )
    }

    const renderImages = () => {
        if (!shoppingBagProducts.hasOwnProperty("data") || Object.keys(shoppingBagProducts.data).length === 0) {
            return <CircularProgress color="secondary"/>
        }

        let imageList = []

        for (const [id, product] of Object.entries(shoppingBagProducts.data)) {
            imageList.push(
                <Grid key={id} item sm={2} style={{alignSelf: "center", paddingBottom: "1rem"}}>
                    <img key={product.id} src={product.imageURL}
                         alt={product.name} width="inherit" height={80}/>
                </Grid>
            )
        }

        return imageList
    }

    const renderShippingRadioButtons = () => {
        return (
            <FormControl component="fieldset" style={{width: "inherit"}}>
                <RadioGroup aria-label="delivery-option" name="delivery-option" value={shippingOptionState.value}
                            onChange={handleRadioBtnChange} style={{width: "inherit"}}>
                    <FormControlLabel value="free" control={<Radio style={{marginLeft: 15}}/>}
                                      style={{width: "inherit", margin: "inherit"}}
                                      classes={{label: classes.formControlLabel}}
                                      label={renderRadioBtnLabel(shippingOptionsData.free.label,
                                          shippingOptionsData.free.transitLabel,
                                          shippingOptionsData.free.price,
                                          shippingOptionsData.free.estimatedDays)}/>
                    <FormControlLabel value="premium" control={<Radio style={{marginLeft: 15}}/>}
                                      style={{width: "inherit", margin: "inherit"}}
                                      classes={{label: classes.formControlLabel}}
                                      label={renderRadioBtnLabel(shippingOptionsData.premium.label,
                                          shippingOptionsData.premium.transitLabel,
                                          shippingOptionsData.premium.price,
                                          shippingOptionsData.premium.estimatedDays)}/>
                    <FormControlLabel value="express" control={<Radio style={{marginLeft: 15}}/>}
                                      style={{width: "inherit", margin: "inherit"}}
                                      classes={{label: classes.formControlLabel}}
                                      label={renderRadioBtnLabel(shippingOptionsData.express.label,
                                          shippingOptionsData.express.transitLabel,
                                          shippingOptionsData.express.price,
                                          shippingOptionsData.express.estimatedDays)}/>
                </RadioGroup>
            </FormControl>
        )
    }

    log.info("[ShippingOptions] Rendering ShippingOptions Component.")
    log.info(`shippingOptionState-3 = ${JSON.stringify(shippingOptionState)}`)

    return (
        <Grid item style={{width: "100%", height: "fit-content"}}>
            <Grid item container sm={10} wrap="wrap"
                  style={{padding: "25px 0 0 30px", height: "fit-content"}}>
                {renderImages()}
            </Grid>
            <Grid item container sm={12} justify="center">
                {shippingOptionState.submitted ?
                    renderSelectedOption() : renderShippingRadioButtons()}
            </Grid>
            <Grid item container justify="center" sm={12}
                  style={{paddingTop: 20}}>
                <Divider style={{height: 1, width: "inherit"}}/>
            </Grid>

            {shippingOptionState.submitted ? renderEditButton() : <ContinueButton
                buttonHandler={submitHandler}/>}
        </Grid>
    )
}