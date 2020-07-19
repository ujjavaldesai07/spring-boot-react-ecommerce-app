import React from 'react';
import log from 'loglevel';
import {TextField, MenuItem, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ContinueButton from "./continueButton";

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
    margin: "20px 0 0 20px",
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

function ShippingAddress() {
    const classes = useStyles();

    const [currency, setCurrency] = React.useState('');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    const renderTextField = (label, required) => {
        return (
            <Grid item container>
                <TextField label={label} variant="outlined"
                           fullWidth
                           size="medium" required={required}
                           style={textFieldStyles}/>
            </Grid>
        )
    }

    log.info("[ShippingAddress] Rendering ShippingAddress Component.")

    return (
        <Grid item style={{width: "100%", height: 620}}>
            <Grid item xs={11} sm={8}>
                <form className={classes.root} style={{width: "inherit"}}>
                    {renderTextField("First Name", true)}
                    {renderTextField("Last Name", true)}
                    {renderTextField("Address Line 1", true)}
                    {renderTextField("Address Line 2 (optional)", false)}

                    <Grid item container>
                        <Grid item container xs={6} sm={6} style={{paddingRight: 15}}>
                            <TextField label="Zip Code" variant="outlined"
                                       size="medium" required
                                       fullWidth
                                       style={textFieldStyles}/>
                        </Grid>

                        <Grid item container xs={6} sm={6}>
                            <TextField
                                id="state-code"
                                select
                                label="State"
                                value={currency}
                                onChange={handleChange}
                                required
                                fullWidth
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
            <ContinueButton/>
        </Grid>
    )
}

export default ShippingAddress;