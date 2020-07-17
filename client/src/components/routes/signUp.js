import React from "react";
import WebForm from "../ui/webForm";
import {connect} from 'react-redux';
import {signUp} from "../../actions";
import {Grid} from "semantic-ui-react";
import {StyledLoginScreenGrid} from "../../styles/semanticUI/customStyles";
import log from "loglevel";
import {useBackButton} from "../backButtonHook";

const SignUp = (props) => {
    const onSubmit = formValues => {
        log.debug(`[SignUpScreen]: onSubmit formValues = ${JSON.stringify(formValues)}`)
        props.signUp(formValues)
    };

    useBackButton()

    log.info(`[SignUpScreen]: Rendering SignUpScreen Component`)
    return (
        <StyledLoginScreenGrid centered>
            <Grid.Column width={4}>
            <WebForm onSubmit={onSubmit}
                     formName='signup'
                     headerTitle='Sign Up'
                     groupFields={['FirstName', 'LastName']}
                     fields={['Username', 'Email', 'Password', 'Confirm Password']}
                     termsConditionField={true}
                     buttonText="Sign Up"/>
            </Grid.Column>
        </StyledLoginScreenGrid>
    )
}

export default connect(null, {signUp})(SignUp);