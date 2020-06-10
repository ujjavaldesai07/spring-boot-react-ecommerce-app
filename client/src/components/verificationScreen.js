import React from "react";
import {connect} from 'react-redux';
import {signIn} from "../actions";

const VerificationScreen = (props) => {
    const onSubmit = formValues => {
        props.signIn(formValues)
    };

    return (
        <div>
            Verification Screen
        </div>
    )
}

export default connect(null, {signIn})(VerificationScreen);