import React from "react";
import WebForm from "./webForm";
import {connect} from 'react-redux';
import {signUp} from "../actions";
import {Grid} from "semantic-ui-react";
import {StyledLoginScreenGrid} from "../styles/contentScreenStyles";

const SignupScreen = (props) => {
    const onSubmit = formValues => {
        props.signUp(formValues)
    };

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

export default connect(null, {signUp})(SignupScreen);