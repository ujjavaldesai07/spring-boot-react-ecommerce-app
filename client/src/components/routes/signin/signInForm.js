import React, {Component} from 'react';
import log from 'loglevel';
import {Button, Grid} from "@material-ui/core";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {signIn} from "../../../actions"
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import {renderReduxTextField} from "../../ui/reduxTextField";

class SignInForm extends Component {

    handleSubmit = event => {
        event.preventDefault();
        this.props.signIn(this.props.signInFormStore.values)
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

                    {renderFormTextField("Username", "username", <AccountCircle/>, "text")}
                    {renderFormTextField("Password", "password", <LockIcon/>, "password")}

                    {renderErrorMsg(this.props.signInReducer.errorMsg)}

                    <Grid container justify="center" style={{paddingTop: "2rem"}}>
                        <Grid item sm={5}>
                            <Button variant="contained"
                                    size="large"
                                    style={{
                                        width: "100%", backgroundColor: "teal",
                                        color: "white", fontSize: "1rem", fontWeight: "bold"
                                    }}
                                    disabled={submitting || pristine}
                                    type="submit">
                                Sign In
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
        'username',
        'password',
    ];

    requiredFields.forEach(field => {
        if (!formValues[field]) {
            errors[field] = 'Required';
        }
    });

    return errors;
}

const mapStateToProps = (state) => {
    return ({
        signInFormStore: state.form.signInForm ?
            state.form.signInForm : null,
        signInReducer: state.signInReducer
    })
}

const reduxWrapperForm = reduxForm({
    form: 'signInForm',
    validate,
})(SignInForm);

export default connect(mapStateToProps, {signIn})(reduxWrapperForm);