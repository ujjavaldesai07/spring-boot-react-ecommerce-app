import React, {Component} from 'react';
import log from 'loglevel';
import {MenuItem, Grid, Card, CardContent, Divider} from "@material-ui/core";
import ContinueButton from "./continueButton";
import {withStyles} from "@material-ui/core/styles";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {TextField} from "redux-form-material-ui"
import {stateCodes} from "../../../constants/stateCodes";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import {setShippingAddress} from "../../../actions"
import IconButton from '@material-ui/core/IconButton';
import Modal from "../../ui/modal";

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
            addressRemovalConfirmation: false,
        }
    }

    onSubmitHandler = () => {
        log.info(`[ShippingAddress] values = ${JSON.stringify(this.props.shippingAddressFormStore)}`)
        let formValues = this.props.shippingAddressFormStore.values

        let id = `${formValues.firstName}-${formValues.lastName}-${Math.floor(Date.now() / 1000)}`

        this.props.setShippingAddress({
            values: {...this.props.shippingAddressFormStore.values, "id": id},
            submitted: true
        })
    }

    render() {
        const {classes, handleSubmit, firstName, submitting, pristine} = this.props;
        const submitHandler = this.onSubmitHandler.bind(this);

        log.info(`[ShippingAddress] Rendering ShippingAddress Component. firstName = ${firstName}`)

        const handleEditBtnClick = () => {
            this.props.setShippingAddress({submitted: false})
        }

        const handleDeleteAddressClick = (formValues) => () => {
            this.setState({addressRemovalConfirmation: true})
        }

        const renderTextField = (label, name, validationRules) => {
            return (
                <Grid item container xs={11} sm={8}>
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
                    <Grid item xs={12} sm={12}>
                        <form onSubmit={handleSubmit(submitHandler)} className={classes.root}
                              style={{width: "inherit"}}>
                            {renderTextField("First Name", "firstName", requiredRule)}
                            {renderTextField("Last Name", "lastName", requiredRule)}
                            {renderTextField("Address Line 1", "addressLine1",
                                [requiredRule, addressLine1Rule])}
                            {renderTextField("Address Line 2 (optional)", "addressLine2", null)}

                            <Grid item container xs={11} sm={8}>
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
                <Grid item lg={4} style={{margin: "2rem"}}>
                    <Card style={{height: "fit-content", fontSize: "1.1rem"}}>
                        <CardContent style={{height: "fit-content"}}>

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

                        <Grid container style={{padding: "0 0.8rem 1rem 1rem"}}>
                            <Grid item xs={6} style={{alignSelf: "center"}}>
                                <Button variant="outlined" color="default" fullWidth style={{
                                    height: "3rem",
                                    fontSize: "1rem"
                                }} onClick={handleEditBtnClick}>
                                    Edit
                                </Button>
                            </Grid>

                            <Grid item container xs={6} justify={"flex-end"}>
                                <IconButton onClick={handleDeleteAddressClick(values)}>
                                    <DeleteIcon fontSize="large"/>
                                </IconButton>
                            </Grid>

                        </Grid>
                    </Card>
                </Grid>
            )
        }

        const renderShippingSummaryAddresses = () => {
            return (
                <Grid container justify="flex-start" style={{height: "fit-content", backgroundColor: "#80808033"}}>
                    {renderShippingSummaryAddress(this.props.shippingAddress.values)}
                </Grid>
            )
        }

        const renderAddressRemovalConfirmation = () => {
            return (
                <Grid container direction="column">
                    <Grid item container direction="column" style={{margin: "1rem"}}>
                        <Grid item
                              style={{color: "#3e4152", fontSize: 14, fontWeight: "bolder", paddingBottom: "1rem"}}>
                            Remove Address
                        </Grid>
                        <Grid item style={{color: "#696b79", fontSize: 14, fontWeight: 200}}>
                            Are you sure you want to remove selected address?
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Divider style={{width: 300, height: 1}}/>
                    </Grid>
                    <Grid item container alignItems="center" style={{textAlignLast: "center"}}>
                        <Grid item xs={6} onClick={removeModalClickHandler} style={{
                            color: "red", fontWeight: "bold", cursor: "pointer"
                        }}>
                            REMOVE
                        </Grid>
                        <Divider orientation="vertical" style={{width: 0, height: 45}}/>
                        <Grid item xs={5} onClick={closeModalClickHandler}
                              style={{fontWeight: "bold", cursor: "pointer", paddingLeft: "1.3rem"}}>
                            CANCEL
                        </Grid>
                    </Grid>
                </Grid>
            )
        }

        const closeModalClickHandler = () => {
            this.setState({addressRemovalConfirmation: false})
        }

        const removeModalClickHandler = () => {
            this.props.reset('shippingAddressForm')
            this.props.setShippingAddress({values: null, submitted: false})
            this.setState({addressRemovalConfirmation: false})
        }

        log.info(`this.state.addressRemovalConfirmation = ${this.state.addressRemovalConfirmation}`)
        return (
            <>
                {this.props.shippingAddress.submitted
                    ? renderShippingSummaryAddresses() : renderShippingForm()}
                {this.state.addressRemovalConfirmation ?
                    <Modal renderWarningComponent={renderAddressRemovalConfirmation()}
                           modalWidth="300px"
                           closeHandler={closeModalClickHandler}/> : null}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        shippingAddressFormStore: state.form.shippingAddressForm ?
            state.form.shippingAddressForm : null,
        shippingAddress: state.shippingAddressReducer

    })
}

const reduxWrapperForm = reduxForm({
    form: 'shippingAddressForm',
})(ShippingAddressForm);

const connectWrapperForm = connect(mapStateToProps, {setShippingAddress})(reduxWrapperForm);

export default withStyles(styles, {withTheme: true})(connectWrapperForm);