import React, {Component} from 'react';
import log from 'loglevel';
import {Button, Grid} from "@material-ui/core";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {signUp} from "../../../actions"
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import {renderReduxTextField} from "../../ui/reduxTextField";

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: null
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        if (!this.props.signUpFormStore.values.termsCheckbox) {
            log.info('Please read the terms and conditions. Checkbox is uncheck.')
            this.setState({errorMsg: "Please read the terms and conditions. Checkbox is uncheck."})
            return
        }

        this.props.loadingHandler(true)
        this.props.signUp(this.props.signUpFormStore.values)
    }

    render() {
        const {submitting, pristine} = this.props;

        const renderFormTextField = (label, name, icon, type) => (
            <Grid container>
                <Field
                    name={name}
                    component={renderReduxTextField}
                    label={label}
                    props={{icon, type}}
                />
            </Grid>
        )

        const renderCheckbox = ({input, label}) => (
            <FormControlLabel
                control={
                    <Checkbox
                        checked={!!input.value}
                        onChange={input.onChange}/>
                }
                label={label}
                style={{padding: "0.5rem 0 0.5rem 0.5rem"}}
            />
        );

        const renderErrorMsg = errMsg => {
            if (!errMsg) {
                return null
            }
            return (
                <Grid item container justify="center" style={{
                    padding: "0.5rem 0", color: "red",
                    fontSize: "1rem", fontWeight: "bold"
                }}>
                    {`Error: ${errMsg}`}
                </Grid>
            )
        }

        log.info(`[SignUpForm] Rendering SignUpForm Component...`)

        return (
            <Grid container>
                <form onSubmit={this.handleSubmit}
                      style={{width: "inherit"}}>

                    <Grid container>
                        <Grid item xs={6} style={{paddingRight: "0.5rem"}}>
                            <Field
                                name="firstName"
                                component={renderReduxTextField}
                                label="First Name"
                                props={{icon: <PersonIcon/>, type: "text"}}
                            />
                        </Grid>

                        <Grid item xs={6} style={{paddingLeft: "0.5rem"}}>
                            <Field
                                name="lastName"
                                component={renderReduxTextField}
                                label="Last Name"
                                props={{icon: <PersonIcon/>, type: "text"}}
                            />
                        </Grid>
                    </Grid>

                    {renderFormTextField("Username", "username", <AccountCircle/>, "text")}
                    {renderFormTextField("Email", "email", <EmailIcon/>, "email")}
                    {renderFormTextField("Password", "password", <LockIcon/>, "password")}
                    {renderFormTextField("Confirm Password", "confirmPassword", <LockIcon/>, "password")}

                    <Field
                        name="termsCheckbox"
                        component={renderCheckbox}
                        label="I agree to the Terms and Conditions."
                    />

                    {renderErrorMsg(this.state.errorMsg)}
                    {renderErrorMsg(this.props.signUpReducer.errorMsg)}

                    <Grid container justify="center" style={{padding: "1rem 0"}}>
                        <Grid item xs={10} sm={6}>
                            <Button variant="contained"
                                    size="large"
                                    style={{
                                        width: "100%", backgroundColor: "teal",
                                        color: "white", fontSize: "1rem", fontWeight: "bold"
                                    }}
                                    disabled={submitting || pristine}
                                    type="submit">
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>

                </form>
            </Grid>
        )
    }
}

const validate = (formValues) => {
    const errors = {};
    const requiredFields = [
        'firstName',
        'lastName',
        'username',
        'password',
        'confirmPassword',
        'termsCheckbox',
    ];
    const minLength8 = value => value && value.length < 8 ? `Must be 8 characters or more` : undefined
    requiredFields.forEach(field => {
        if (!formValues[field]) {
            errors[field] = 'Required';
        }
    });

    if (formValues.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
        errors.email = 'Invalid email address';
    }

    if (formValues.password) {
        errors.password = minLength8(formValues.password)
    }

    if (formValues.password && formValues.confirmPassword) {
        console.log(`formValues.password = ${formValues.password}`)
        console.log(`formValues.confirmPassword = ${formValues.confirmPassword}`)
        console.log(`result = ${formValues.password.localeCompare(formValues.confirmPassword)}`)
        if (formValues.password.localeCompare(formValues.confirmPassword) !== 0) {
            errors.confirmPassword = 'Confirm password did not matched';
        }
    }

    return errors;
}

const mapStateToProps = (state) => {
    return ({
        signUpFormStore: state.form.signUpForm ?
            state.form.signUpForm : null,
        signUpReducer: state.signUpReducer
    })
}

const reduxWrapperForm = reduxForm({
    form: 'signUpForm',
    validate,
})(SignUpForm);

export default connect(mapStateToProps, {signUp})(reduxWrapperForm);