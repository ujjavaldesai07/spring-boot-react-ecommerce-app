import React, {Component} from 'react';
import log from 'loglevel';
import {MenuItem, Grid} from "@material-ui/core";
import ContinueButton from "./continueButton";
import {withStyles} from "@material-ui/core/styles";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {stateCodes} from "../../../constants/stateCodes";
import {setShippingAddress} from "../../../actions"
import {ModalConfirmation} from "../../ui/modalConfirmation";
import {SummaryCard} from "./summaryCard";
import {checkoutFormStyles} from "../../../styles/materialUI/checkoutFormStyles";
import {renderReduxTextField} from "../../ui/reduxTextField";

class ShippingAddressForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addressRemovalConfirmation: false,
        }
    }

    closeModalHandler = () => {
        this.setState({addressRemovalConfirmation: false})
    }

    removeConfirmedHandler = () => {
        this.props.reset('shippingAddressForm')
        this.props.setShippingAddress({submitted: false})
        this.setState({addressRemovalConfirmation: false})
    }

    handleSubmit = () => {
        log.info(`[ShippingAddress] values = ${JSON.stringify(this.props.shippingAddressFormStore)}`)
        // let formValues = this.props.signUpFormStore.values
        // let id = `${formValues.firstName}-${formValues.lastName}-${Math.floor(Date.now() / 1000)}`

        this.props.setShippingAddress({submitted: true})
    }

    editBtnHandler = () => {
        this.props.setShippingAddress({submitted: false})
    }

    deleteBtnHandler = () => {
        this.setState({addressRemovalConfirmation: true})
    }

    render() {
        const {classes, submitting, pristine} = this.props;

        const renderShippingSummaryAddresses = () => {
            let formValues = this.props.shippingAddressFormStore.values
            let contentList = [
                `${formValues.firstName} ${formValues.lastName}`,
                formValues.addressLine1,
                formValues.addressLine2,
                `${formValues.city}, ${formValues.stateCode} ${formValues.zipCode}`,
                formValues.email,
                `(${formValues.phoneNumber.slice(0, 3)}) ` +
                `${formValues.phoneNumber.slice(3, 6)}-${formValues.phoneNumber.slice(6, 10)}`
            ]

            return (
                <Grid container justify="flex-start" style={{height: "fit-content", backgroundColor: "#80808033"}}>
                    <SummaryCard contentList={contentList}
                                 editBtnHandler={this.editBtnHandler}
                                 deleteBtnHandler={this.deleteBtnHandler}/>
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

        const renderFormTextField = (label, name) => {
            return (
                <Grid item container xs={11} sm={8}>
                    <Field
                        name={name}
                        component={renderReduxTextField}
                        label={label}
                    />
                </Grid>
            )
        }

        const renderShippingForm = () => {
            return (
                <Grid item style={{width: "100%", height: "fit-content"}}>
                    <Grid item xs={12}>
                        <form onSubmit={this.handleSubmit} className={classes.root}
                              style={{width: "inherit"}}>

                            {renderFormTextField("First Name", "firstName")}
                            {renderFormTextField("Last Name", "lastName")}
                            {renderFormTextField("Email", "email")}
                            {renderFormTextField("Address Line 1", "addressLine1")}

                            <Grid item container xs={11} sm={8}>
                                <Field
                                    name="addressLine2"
                                    component={renderReduxTextField}
                                    label="Address Line 2 (optional)"
                                    props={{placeholder: "Apt, Suite, Bldg, Floor, etc", shrink: true}}
                                />
                            </Grid>

                            <Grid item container xs={11} sm={8}>
                                <Grid item container xs={6} style={{paddingRight: 15}}>
                                    <Field
                                        name="zipCode"
                                        component={renderReduxTextField}
                                        label="Zip Code"
                                    />
                                </Grid>

                                <Grid item container xs={6}>
                                    <Field
                                        name="stateCode"
                                        label="State"
                                        component={renderReduxTextField}
                                        props={{selectField: true}}
                                    >
                                        {renderStateCodes()}
                                    </Field>
                                </Grid>

                            </Grid>

                            {renderFormTextField("City", "city")}

                            <Grid item container xs={11} sm={8}>
                                <Field
                                    name="phoneNumber"
                                    component={renderReduxTextField}
                                    label="Phone Number"
                                    props={{placeholder: "123-123-1234", shrink: true}}
                                />
                            </Grid>

                            <ContinueButton type="submit" action={submitting || pristine}/>
                        </form>
                    </Grid>
                </Grid>
            )
        }

        log.info(`[ShippingAddress] Rendering ShippingAddress Component...`)

        return (
            <>
                {this.props.shippingAddress.submitted ? renderShippingSummaryAddresses() : renderShippingForm()}

                {this.state.addressRemovalConfirmation ?
                    <ModalConfirmation closeModalHandler={this.closeModalHandler}
                                       removeConfirmedHandler={this.removeConfirmedHandler}
                                       title="Remove Address"
                                       question="Are you sure you want to remove selected address?"/> : null}
            </>
        )
    }
}

const validate = (formValues) => {
    const errors = {};
    const requiredFields = [
        'firstName',
        'lastName',
        'email',
        'addressLine1',
        'zipCode',
        'stateCode',
        'city',
        'phoneNumber'
    ];
    requiredFields.forEach(field => {
        if (!formValues[field]) {
            errors[field] = 'Required';
        }
    });

    if (formValues.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
        errors.email = 'Invalid email address';
    }

    if (formValues.zipCode &&
        !/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(formValues.zipCode)) {
        errors.zipCode = 'Invalid Zip Code';
    }

    if (formValues.phoneNumber &&
        !/^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/.test(formValues.phoneNumber)) {
        errors.phoneNumber = 'Invalid Phone Number';
    }
    return errors;
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
    destroyOnUnmount: false,
    validate,
})(ShippingAddressForm);

const connectWrapperForm = connect(mapStateToProps, {setShippingAddress})(reduxWrapperForm);

export default withStyles(checkoutFormStyles, {withTheme: true})(connectWrapperForm);