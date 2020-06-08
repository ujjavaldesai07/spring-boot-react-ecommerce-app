import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, Form, Grid, Message, Divider} from 'semantic-ui-react'
import {Typography} from "@material-ui/core";
import {connect} from 'react-redux';
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import {StyledWebButton} from "../styles/contentScreenStyles";

class WebForm extends React.Component {
    state = {
        loading: false
    }

    renderInput = ({input, label, meta}) => {
        let inputType;
        let icon, iconPosition;
        if (label.toLowerCase() === 'password') {
            inputType = 'password'
            icon = 'lock'
            iconPosition = 'left'
        } else {
            inputType = 'text'
            icon = 'user'
            iconPosition = 'left'
        }
        if (meta.error && meta.touched) {
            return (
                <Form.Input {...input} fluid
                            input={inputType}
                            placeholder={label}
                            error={{content: meta.error, pointing: 'below'}}
                            icon={icon} iconPosition={iconPosition}
                />
            );
        } else {
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
        console.log('Fields = ' + fields)
        return fields.map(field => {
            return <Field key={field} name={field}
                          component={this.renderInput} label={field}/>
        })
    }

    termsConditionField = () => {
        return this.props.termsField ?
            '' : <Form.Checkbox label='I agree to the Terms and Conditions'/>
    }

    onSubmit = formValues => {
        this.setState({loading: true});
        this.props.onSubmit(formValues);
    };

    checkLoginError = () => {
        console.log('ErrorMsg = ' + this.props.errorMsg)
        this.state.loading = false
        if (this.props.errorMsg) {
            console.log('2)ErrorMsg = ' + this.props.errorMsg)
            return <Message
                error
                header='Account Error'
                content={`Error: ${this.props.errorMsg}`}
            />
        }
        return null
    }

    render() {
        return (
                <Grid stackable>
                    <Grid.Row centered>
                        <Grid.Column width='4'>
                            <Grid centered padded="vertically">
                                <Grid.Column width='6'>
                                    <Typography style={{paddingBottom: '30px', fontWeight: 'bold'}} variant="h4">
                                        Sign In
                                    </Typography>
                                </Grid.Column>
                            </Grid>
                            <Form error loading={this.state.loading} size={'small'}
                                  onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                {this.renderField(this.props.fields)}
                                {this.checkLoginError()}
                                <Grid centered padded="vertically">
                                    <Grid.Column width={8}>
                                        <Typography style={{paddingBottom: '10px', fontWeight: 'bold'}} variant="h7">
                                            Forgot Your Password?
                                        </Typography>
                                    </Grid.Column>
                                </Grid>
                                <Grid centered padded="vertically">
                                    <Grid.Column width={8}>
                                        <StyledWebButton size='medium' className="centered" color='teal'
                                                         type='submit'>{this.props.buttonText}</StyledWebButton>
                                    </Grid.Column>
                                </Grid>
                            </Form>
                            <Grid centered padded="vertically">
                                <Grid.Column width={14}>
                                    <Divider horizontal>Or</Divider>
                                </Grid.Column>
                            </Grid>

                            <Grid centered padded="vertically">
                                <Grid.Column width={8}>
                                    <StyledWebButton color='google plus'>
                                        <Icon name='google plus'/> Google
                                    </StyledWebButton>
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>

                        <Divider vertical>Or</Divider>
                        <Grid.Column width={4}/>
                    </Grid.Row>
                </Grid>
        )
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.Username) {
        errors.Username = 'Please enter your username';
    }

    if (!formValues.password) {
        errors.Password = 'Please enter your password';
    }

    return errors;
};

const mapStateToProps = state => {
    return {
        errorMsg: state.authenticate.errorMsg
    }
}

const wrapperForm = reduxForm({
    form: 'webForm',
    validate
})(WebForm);

export default connect(mapStateToProps)(wrapperForm);
