import React from "react";
import {Field, reduxForm} from "redux-form";
import {Form, Grid, Message} from 'semantic-ui-react'
import {Typography} from "@material-ui/core";
import {connect} from 'react-redux';
import {StyledWebButton} from "../../styles/semanticUI/customStyles";
import log from "loglevel";

class WebForm extends React.Component {
    state = {
        errorMsg: null
    }
    isChecked = false
    loading = false

    renderInput = ({input, label, meta: {error, touched}}) => {
        log.debug(`[WebForm]: renderInput error = ${error} and touched = ${touched}`)

        let inputType;
        let icon, iconPosition;
        if (label.toLowerCase().includes('password')) {
            inputType = 'password'
            icon = 'lock'
            iconPosition = 'left'
        } else {
            inputType = 'text'
            icon = 'user'
            iconPosition = 'left'
        }
        if (error && touched) {
            log.debug(`[WebForm]: renderInput error && touched`)
            return (
                <Form.Input {...input} fluid
                            input={inputType}
                            placeholder={label}
                            error={{content: error, pointing: 'below'}}
                            icon={icon} iconPosition={iconPosition}
                />
            );
        } else {
            log.debug(`[WebForm]: renderInput is not error && touched`)
            return (
                <Form.Input {...input} fluid
                            input={inputType}
                            placeholder={label}
                            icon={icon} iconPosition={iconPosition}
                />
            );
        }
    };

    renderField = fields => {
        if (!fields) {
            log.debug(`[WebForm]: renderField fields is null`)
            return null
        }
        log.debug(`[WebForm]: renderField fields = ${JSON.stringify(fields)}`)
        return fields.map(field => {
            return <Field key={field}
                          name={field.split(" ").join("")}
                          component={this.renderInput}
                          label={field}
            />
        })
    }

    renderForgotPasswordField = () => {
        log.debug(`[WebForm]: renderForgotPasswordField 
            this.props.forgotPasswordField = ${this.props.forgotPasswordField}`)
        return this.props.forgotPasswordField ?
            (
                <Grid centered padded="vertically">
                    <Typography style={{paddingBottom: '10px', fontWeight: 'bold'}} variant="subtitle2">
                        Forgot Username/Password?
                    </Typography>
                </Grid>
            ) : null
    }

    handleCheckboxChange = (e, {checked}) => {
        this.isChecked = checked;
    }

    renderTermsConditionField = () => {
        log.debug(`[WebForm]: renderTermsConditionField 
            this.props.termsConditionField = ${this.props.termsConditionField}`)
        return this.props.termsConditionField ?
            <Form.Checkbox onChange={this.handleCheckboxChange}
                           label='I agree to the Terms and Conditions'/> : null
    }

    renderLoginError = () => {
        this.loading = false
        if (this.props.errorMsg || this.state.errorMsg) {
            log.debug(`[WebForm]: renderLoginError 
            error = ${this.props.errorMsg ? this.props.errorMsg: this.state.errorMsg}`)

            return <Message
                error
                header='Account Error'
                content={this.props.errorMsg ? this.props.errorMsg: this.state.errorMsg}
            />
        }

        return null
    }

    onSubmit = (formValues) => {
        log.debug(`[WebForm]: onSubmit formValues = ${JSON.stringify(formValues)}`)
        if(this.props.formName === 'signup') {
            if(!this.isChecked) {
                this.setState({errorMsg: 'please read the terms and condition and check the checkbox.'});
                return null
            } else if(this.state.errorMsg) {
                this.setState({errorMsg: null});
            }
        }

        this.loading = true
        this.props.onSubmit(formValues);
    };

    render() {
        log.info(`[WebForm]: Rendering WebForm Component this.state = ${JSON.stringify(this.state)}`)
        return (
            <>
                <Grid centered padded="vertically" columns={8}>
                    <Grid.Column width='16' textAlign='center'>

                        <Typography style={{paddingBottom: '30px', fontWeight: 'bold'}} variant="h4">
                            {this.props.headerTitle}
                        </Typography>

                            <Form error loading={this.loading} size={'small'}
                                  onSubmit={this.props.handleSubmit(this.onSubmit)}>

                                <Form.Group widths='equal'>
                                    {this.renderField(this.props.groupFields)}
                                </Form.Group>
                                {this.renderField(this.props.fields)}

                                {this.renderForgotPasswordField()}
                                {this.renderTermsConditionField()}
                                {this.renderLoginError()}

                                <Grid centered>
                                    <Grid.Column width={7}>
                                        <StyledWebButton size='medium' className="centered" color='teal'
                                                         type='submit'>{this.props.buttonText}</StyledWebButton>
                                    </Grid.Column>
                                </Grid>
                            </Form>

                    </Grid.Column>
                </Grid>
            </>
        )
    }
}

const validate = (formValues) => {
    log.info(`[WebForm]: validate formValues = ${JSON.stringify(formValues)}`)
    const errors = {};
    const required = value => 'Please enter your ' + value;
    const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined
    const minLength8 = value => value && value.length < 8 ? `Must be 8 characters or more` : undefined

    if (!formValues.Username) {
        errors.Username = required('username');
    }

    if (!formValues.Password) {
        errors.Password = required('password');
    }

    if (!formValues.FirstName) {
        errors.FirstName = required('first name');
    }

    if (!formValues.LastName) {
        errors.LastName = required('last name');
    }

    if (!formValues.Email) {
        errors.Email = required('username');
    } else if (formValues.Email) {
        errors.Email = email(formValues.Email)
    }

    if (!formValues.ConfirmPassword) {
        errors.ConfirmPassword = required('username');
    } else if (formValues.ConfirmPassword) {
        errors.ConfirmPassword = minLength8(formValues.ConfirmPassword)
        if (formValues.Password !== formValues.ConfirmPassword) {
            errors.ConfirmPassword = 'Confirm password did not matched';
        }
    }

    log.debug(`[WebForm]: validate errors = ${JSON.stringify(errors)}`)
    return errors;
}

const mapStateToProps = state => {
    log.debug(`[WebForm]: mapStateToProps state = ${JSON.stringify(state)}`)
    return {
        errorMsg: state.authenticate.errorMsg
    }
}

const wrapperForm = reduxForm({
    form: 'webForm',
    validate
})(WebForm);

export default connect(mapStateToProps)(wrapperForm);
