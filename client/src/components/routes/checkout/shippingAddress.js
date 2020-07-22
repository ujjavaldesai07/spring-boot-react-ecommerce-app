import React, {Component} from 'react';
import log from 'loglevel';
import {MenuItem, Grid, Card, CardContent} from "@material-ui/core";
import ContinueButton from "./continueButton";
import {withStyles} from "@material-ui/core/styles";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {TextField} from "redux-form-material-ui"
import {stateCodes} from "../../../constants/stateCodes";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import {setShippingAddress} from "../../../actions"

const styles = theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    formControlLabel: {
        width: "inherit"
    }
});

const textFieldStyles = {
    width: "inherit",
    height: 50,
    margin: "20px 0 0 20px",
}

const requiredRule = value => (value == null ? 'Required' : undefined);
const phoneNoRule = value =>
    (value && !/^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/.test(value)
        ? 'Invalid Phone Number'
        : undefined);
const zipCodeRule = value => (value && !/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value)
    ? 'Invalid Zip Code'
    : undefined);
const addressLine1Rule = value => (value && !/^[a-zA-Z0-9\s,'-]*$/.test(value)
    ? 'Invalid Address format. Expected 2600, xxxxxx xxxxxx'
    : undefined);

class ShippingAddressForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            values: null,
        }
    }

    onSubmitHandler = () => {
        log.info(`[ShippingAddress] values = ${JSON.stringify(this.props.shippingAddressFormStore)}`)
        this.setState({values: this.props.shippingAddressFormStore.values})
        this.props.setShippingAddress({values: this.props.shippingAddressFormStore.values, submitted: true})
    }

    render() {
        const {classes, handleSubmit, firstName, submitting, pristine} = this.props;
        const submitHandler = this.onSubmitHandler.bind(this);

        log.info(`[ShippingAddress] Rendering ShippingAddress Component. firstName = ${firstName}`)

        const handleChange = (event) => {
            log.info(`event.target.value = ${event.target.value}`)
        };

        const onEditBtnClick = () => {

        }

        const renderTextField = (label, name, validationRules) => {
            return (
                <Grid item container lg={8}>
                    <Field
                        name={name}
                        label={label}
                        component={TextField}
                        variant="outlined"
                        fullWidth
                        size="medium"
                        style={textFieldStyles}
                        validate={validationRules}
                    />
                </Grid>
            )
        }

        const renderStateCodes = () => {
            let stateCodeList = []

            for (const [code,] of Object.entries(stateCodes)) {
                stateCodeList.push(
                    <MenuItem key={code} value={code}>
                        {code}
                    </MenuItem>
                )
            }
            return stateCodeList
        }

        const renderShippingForm = () => {
            return (
                <Grid item style={{width: "100%", height: 670}}>
                    <Grid item xs={11} sm={8} lg={12}>
                        <form onSubmit={handleSubmit(submitHandler)} className={classes.root}
                              style={{width: "inherit"}}>
                            {renderTextField("First Name", "firstName", requiredRule)}
                            {renderTextField("Last Name", "lastName", requiredRule)}
                            {renderTextField("Address Line 1", "addressLine1",
                                [requiredRule, addressLine1Rule])}
                            {renderTextField("Address Line 2 (optional)", "addressLine2", null)}

                            <Grid item container lg={8}>
                                <Grid item container xs={6} style={{paddingRight: 15}}>
                                    <Field
                                        name="zipCode"
                                        label="Zip Code"
                                        component={TextField}
                                        variant="outlined"
                                        fullWidth
                                        size="medium"
                                        style={textFieldStyles}
                                        validate={[requiredRule, zipCodeRule]}
                                    />
                                </Grid>

                                <Grid item container xs={6}>
                                    <Field
                                        name="stateCode"
                                        label="State"
                                        component={TextField}
                                        variant="outlined"
                                        select
                                        onChange={handleChange}
                                        fullWidth
                                        size="medium"
                                        style={textFieldStyles}
                                        validate={requiredRule}
                                    >
                                        {renderStateCodes()}
                                    </Field>
                                </Grid>

                            </Grid>

                            {renderTextField("City", "city", requiredRule)}
                            {renderTextField("Phone Number", "phoneNumber",
                                [requiredRule, phoneNoRule])}

                            <ContinueButton type="submit" action={submitting || pristine}/>
                        </form>
                    </Grid>
                </Grid>
            )
        }

        const renderShippingSummaryAddress = (values) => {
            return (
                <Grid item lg={5} style={{margin: "2rem 2rem 0 2rem"}}>
                    <Card style={{height: 200, fontSize: "1.1rem"}}>
                        <CardContent style={{height: 160}}>

                            <Grid item style={{marginBottom: "0.5rem"}}>
                                {`${values.firstName} ${values.lastName}`}
                            </Grid>

                            <Grid item style={{marginBottom: "0.5rem"}}>
                                {values.addressLine1}
                            </Grid>

                            {values.addressLine2 ?
                                (<Grid item style={{marginBottom: "0.5rem"}}>
                                    {values.addressLine2}
                                </Grid>) : null}

                            <Grid item style={{marginBottom: "0.5rem"}}>
                                {`${values.city}, ${values.stateCode} ${values.zipCode}`}
                            </Grid>

                            <Grid item style={{marginBottom: "0.5rem"}}>
                                {`(${values.phoneNumber.slice(0, 3)}) ` +
                                `${values.phoneNumber.slice(3, 6)}-${values.phoneNumber.slice(6, 10)}`}
                            </Grid>

                        </CardContent>

                        <Grid container justify="flex-end" style={{paddingRight: "0.5rem", paddingBottom: "1rem"}}>
                            <DeleteIcon fontSize="large"/>
                        </Grid>
                    </Card>

                    <Grid container justify="center" style={{padding: "2rem 3rem 1rem 3rem"}}>
                        <Button variant="contained" color="secondary" fullWidth style={{
                            height: "3rem",
                            fontSize: "1.2rem"
                        }} onClick={onEditBtnClick}>
                            Edit
                        </Button>
                    </Grid>
                </Grid>
            )
        }

        const renderShippingSummaryAddresses = () => {
            return (
                <Grid container justify="flex-start" style={{height: "fit-content", backgroundColor: "#80808033"}}>
                    {renderShippingSummaryAddress(this.state.values)}
                </Grid>
            )
        }

        return (
            <>
                {this.state.values ? renderShippingSummaryAddresses() : renderShippingForm()}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        shippingAddressFormStore: state.form.shippingAddressForm ?
            state.form.shippingAddressForm : null
    })
}

const reduxWrapperForm = reduxForm({
    form: 'shippingAddressForm',
})(ShippingAddressForm);

const connectWrapperForm = connect(mapStateToProps, {setShippingAddress})(reduxWrapperForm);

export default withStyles(styles, {withTheme: true})(connectWrapperForm);