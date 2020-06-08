import React from "react";
import WebForm from "./webForm";
import {connect} from 'react-redux';
import {signIn} from "../actions";

const SignUp = (props) => {

    const onSubmit = formValues => {
        props.signIn(formValues)
    };

    return (
        <div style={{paddingTop: '100px'}}>
            <WebForm onSubmit={onSubmit}
                     groupFields={['FirstName', 'LastName']}
                     fields={['Email', 'Password',
                         'Confirm Password']}
                     buttonText="SignUp"/>
        </div>
    )
}

export default connect(null, {signIn})(SignUp);