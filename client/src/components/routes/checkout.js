import React from 'react';
import log from 'loglevel';
import {Paper, TextField, Box, MenuItem, Button, Divider, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import PriceDetails from "./priceDetails";

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

const textFieldStyles = {
    width: "inherit",
    height: 44,
    margin: "15px 0 15px 0",
}

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

function Checkout() {
    const classes = useStyles();
    log.info("[Checkout] Rendering Checkout Component.")
    const [currency, setCurrency] = React.useState('');
    const [value, setValue] = React.useState('female');

    const handleRadioBtnChange = (event) => {
        setValue(event.target.value);
    };

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    const renderTextField = (label, required) => {
        return (
            <Grid container sm={10}>
                <TextField label={label} variant="outlined"
                           size="medium" required={required}
                           style={textFieldStyles}/>
            </Grid>
        )
    }

    const renderShippingForm = () => {
        return (
            <Grid container sm={10} justify="center">
                <Grid item sm={11}>
                    <form className={classes.root} style={{width: "inherit"}}>
                        {renderTextField("First Name", true)}
                        {renderTextField("Last Name", true)}
                        {renderTextField("Address Line 1", true)}
                        {renderTextField("Address Line 2 (optional)", false)}

                        <Grid container sm={12}>

                            <Grid container sm={5} style={{paddingRight: 15}}>
                                <TextField label="Zip Code" variant="outlined"
                                           size="medium" required
                                           fullWidth={true}
                                           style={textFieldStyles}/>
                            </Grid>

                            <Grid container sm={5}>
                                <TextField
                                    id="state-code"
                                    select
                                    label="State"
                                    value={currency}
                                    onChange={handleChange}
                                    required
                                    fullWidth={true}
                                    style={textFieldStyles}
                                    variant="outlined"
                                >
                                    {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                        </Grid>

                        {renderTextField("City")}
                        {renderTextField("Phone Number")}
                    </form>
                </Grid>
            </Grid>
        )
    }

    const renderShippingOptionRadioGroup = () => {
        return (
            <Grid container sm={12} justify="center">
                <FormControl component="fieldset" style={{width: "inherit"}}>
                    <RadioGroup aria-label="gender" name="gender1" value={value}
                                onChange={handleRadioBtnChange} style={{width: "inherit"}}>
                        <FormControlLabel value="female" control={<Radio style={{marginLeft: 30}}/>}
                                          style={{width: "inherit"}}
                                          classes={{label: classes.formControlLabel}}
                                          label={renderRadioBtnLabel("Everyday Free Shipping",
                                              "Transit time: 3-6 business days", "Free")}/>
                        <FormControlLabel value="male" control={<Radio style={{marginLeft: 30}}/>}
                                          style={{width: "inherit"}}
                                          classes={{label: classes.formControlLabel}}
                                          label={renderRadioBtnLabel("Premium",
                                              "Transit time: 2-3 business days", "$10.00")}/>
                        <FormControlLabel value="other" control={<Radio style={{marginLeft: 30}}/>}
                                          style={{width: "inherit"}}
                                          classes={{label: classes.formControlLabel}}
                                          label={renderRadioBtnLabel("Express",
                                              "Transit time: 1-2 business days", "$15.00")}/>
                    </RadioGroup>
                </FormControl>
            </Grid>
        )
    }

    const renderRadioBtnLabel = (lblText, helperText, price) => {
        return (
            <Grid container sm={11} style={{width: "inherit", paddingTop: 20}}>
                <Grid item sm={6} style={{fontWeight: "bolder", fontSize: "1.1rem"}}>
                    {lblText}
                </Grid>
                <Grid container justify="flex-end" sm={6} style={{fontWeight: "bolder", fontSize: "1.1rem"}}>
                    {price}
                </Grid>
                <Grid item>
                    {helperText}
                </Grid>
            </Grid>
        )
    }

    const renderTitle = (title) => {
        return (
            <Grid container justify="center" sm={5}
                  style={{fontSize: "1.8rem", fontWeight: "bolder", paddingTop: 25}}>
                {title}
            </Grid>
        )
    }

    const renderContinueBtn = () => {
        return (
            <Grid container sm={11} justify="flex-end" style={{paddingTop: 30}}>
                <Button variant="contained" size="large" style={{
                    backgroundColor: "#e01a2b",
                    width: "50%", height: 50, fontSize: "1rem", fontWeight: "bolder", color: "White"
                }}>
                    CONTINUE
                </Button>
            </Grid>
        )
    }

    return (
        <Grid container justify="center" spacing={3} style={{backgroundColor: "#80808033"}}>
            <Grid item sm={11} md={7} style={{marginTop: 30}}>
                <Paper square style={{height: 750}}>
                    {renderTitle("SHIPPING ADDRESS")}
                    {renderShippingForm()}
                    {renderContinueBtn()}
                </Paper>
            </Grid>

            <Grid item sm={11} md={7} style={{marginTop: 30}} justify="space-around">
                <Paper square style={{height: 460}}>
                    {renderTitle("SHIPPING OPTIONS")}

                    <Grid container sm={10} wrap="wrap" spacing={1}
                          style={{padding: "25px 0 0 30px", height: 80}}>
                        <Grid item sm={2}>
                            <img src="." alt="image" width={65} height={80}/>
                        </Grid>
                    </Grid>

                    {renderShippingOptionRadioGroup()}

                    <Grid container justify="center" sm={12}
                          style={{paddingTop: 20}}>
                        <Divider style={{height: 1, width: "inherit"}}/>
                    </Grid>

                    {renderContinueBtn()}
                </Paper>
            </Grid>

            <Grid container sm={11} md={3} style={{height: 300, marginTop: 30}}>
                <Paper square style={{width: "inherit"}}>
                    <PriceDetails buttonName="PLACE ORDER"/>
                </Paper>
            </Grid>

        </Grid>
    )
}

export default Checkout;