import React, {Component} from 'react';
import log from 'loglevel';
import {MenuItem, Grid} from "@material-ui/core";
import ContinueButton from "./continueButton";
import {withStyles} from "@material-ui/core/styles";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {TextField} from "redux-form-material-ui"
import {stateCodes} from "../../../constants/stateCodes";
import {setShippingAddress} from "../../../actions"
import {ModalConfirmation} from "../../ui/modalConfirmation";
import {SummaryCard} from "./summaryCard";
import {FormTextField} from "./formTextField";
import {emailRule, phoneNoRule, requiredRule, zipCodeRule} from "../../../constants/formValidationRules";
import {textFieldStyles} from "../../../styles/js/formStyles";
import {checkoutFormStyles} from "../../../styles/materialUI/checkoutFormStyles";

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

    onSubmitHandler = () => {
        log.info(`[ShippingAddress] values = ${JSON.stringify(this.props.shippingAddressFormStore)}`)
        let formValues = this.props.shippingAddressFormStore.values
        let id = `${formValues.firstName}-${formValues.lastName}-${Math.floor(Date.now() / 1000)}`

        this.props.setShippingAddress({submitted: true})
    }

    editBtnHandler = () => {
        this.props.setShippingAddress({submitted: false})
    }

    deleteBtnHandler = () => {
        this.setState({addressRemovalConfirmation: true})
    }

    render() {
        const {classes, handleSubmit, submitting, pristine} = this.props;
        const submitHandler = this.onSubmitHandler.bind(this);

        log.info(`[ShippingAddress] Rendering ShippingAddress Component...`)

        const renderShippingSummaryAddresses = () => {
            let formValues = this.props.shippingAddressFormStore.values
            let contentList = []

            contentList.push(`${formValues.firstName} ${formValues.lastName}`)
            contentList.push(formValues.addressLine1)

            if (formValues.addressLine2) {
                contentList.push(formValues.addressLine2)
            }

            contentList.push(`${formValues.city}, ${formValues.stateCode} ${formValues.zipCode}`)
            contentList.push(formValues.email)
            contentList.push(`(${formValues.phoneNumber.slice(0, 3)}) ` +
                `${formValues.phoneNumber.slice(3, 6)}-${formValues.phoneNumber.slice(6, 10)}`)

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

        const renderFormTextField = (label, name, validationRules) => {
            return (
                <Grid item container xs={11} sm={8}>
                    <FormTextField label={label} name={name}
                                   validationRules={validationRules}/>
                </Grid>
            )
        }

        const renderShippingForm = () => {
            return (
                <Grid item style={{width: "100%", height: "fit-content"}}>
                    <Grid item xs={12} sm={12}>
                        <form onSubmit={handleSubmit(submitHandler)} className={classes.root}
                              style={{width: "inherit"}}>

                            {renderFormTextField("First Name", "firstName", requiredRule)}
                            {renderFormTextField("Last Name", "lastName", requiredRule)}
                            {renderFormTextField("Email", "email",
                                [requiredRule, emailRule])}
                            {renderFormTextField("Address Line 1", "addressLine1", requiredRule)}

                            <Grid item container xs={11} sm={8}>
                                <FormTextField fixedLabel name="addressLine2" label="Address Line 2 (optional)"
                                               placeholder="Apt, Suite, Bldg, Floor, etc"/>
                            </Grid>

                            <Grid item container xs={11} sm={8}>
                                <Grid item container xs={6} style={{paddingRight: 15}}>
                                    <FormTextField label="Zip Code" name="zipCode"
                                                   validationRules={[requiredRule, zipCodeRule]}/>
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
                                        required
                                    >
                                        {renderStateCodes()}
                                    </Field>
                                </Grid>

                            </Grid>

                            {renderFormTextField("City", "city", requiredRule)}

                            <Grid item container xs={11} sm={8}>
                                <FormTextField fixedLabel name="phoneNumber" label="Phone Number"
                                               placeholder="123-123-1234"
                                               validationRules={[requiredRule, phoneNoRule]}/>
                            </Grid>

                            <ContinueButton type="submit" action={submitting || pristine}/>
                        </form>
                    </Grid>
                </Grid>
            )
        }

        log.info(`[ShippingAddress] Rendering Payment Component...`)

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

const mapStateToProps = (state) => {
    return ({
        shippingAddressFormStore: state.form.shippingAddressForm ?
            state.form.shippingAddressForm : null,
        shippingAddress: state.shippingAddressReducer

    })
}

const reduxWrapperForm = reduxForm({
    form: 'shippingAddressForm',
    destroyOnUnmount: false
})(ShippingAddressForm);

const connectWrapperForm = connect(mapStateToProps, {setShippingAddress})(reduxWrapperForm);

export default withStyles(checkoutFormStyles, {withTheme: true})(connectWrapperForm);