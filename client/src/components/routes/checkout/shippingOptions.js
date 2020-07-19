import React from 'react';
import log from 'loglevel';
import {Divider, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
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

function ShippingOptions() {
    const classes = useStyles();

    const [value, setValue] = React.useState('female');

    const handleRadioBtnChange = (event) => {
        setValue(event.target.value);
    };

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

    log.info("[ShippingOptions] Rendering ShippingOptions Component.")

    return (
        <Grid item style={{width: "100%", height: 400}}>
            <Grid item container sm={10} wrap="wrap" spacing={1}
                  style={{padding: "25px 0 0 30px", height: 80}}>
                <Grid item sm={2}>
                    <img src=".." alt="image" width={65} height={80}/>
                </Grid>
            </Grid>
            <Grid item container sm={12} justify="center">
                <FormControl component="fieldset" style={{width: "inherit"}}>
                    <RadioGroup aria-label="gender" name="gender1" value={value}
                                onChange={handleRadioBtnChange} style={{width: "inherit"}}>
                        <FormControlLabel value="female" control={<Radio style={{marginLeft: 15}}/>}
                                          style={{width: "inherit", margin: "inherit"}}
                                          classes={{label: classes.formControlLabel}}
                                          label={renderRadioBtnLabel("Everyday Free Shipping",
                                              "Transit time: 3-6 business days", "Free")}/>
                        <FormControlLabel value="male" control={<Radio style={{marginLeft: 15}}/>}
                                          style={{width: "inherit", margin: "inherit"}}
                                          classes={{label: classes.formControlLabel}}
                                          label={renderRadioBtnLabel("Premium",
                                              "Transit time: 2-3 business days", "$10.00")}/>
                        <FormControlLabel value="other" control={<Radio style={{marginLeft: 15}}/>}
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

            <ContinueButton/>
        </Grid>
    )
}

export default ShippingOptions;