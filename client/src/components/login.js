import React, {useState} from "react";
import WebForm from "./webForm";
import {Loader, Dimmer,Divider} from "semantic-ui-react";
import {connect} from 'react-redux';
import {signIn} from "../actions";

const Login = (props) => {
    const onSubmit = formValues => {
        props.signIn(formValues)
    };

    return (
        <div style={{paddingTop: '100px'}}>
            <WebForm onSubmit={onSubmit}
                     fields={['Username', 'Password']}
                     termsField={true}
                     buttonText="Login"/>
                {/*<Dimmer active={loading}>*/}
                {/*    <Loader size='large'>Loading</Loader>*/}
                {/*</Dimmer>*/}
        </div>
    )
}

export default connect(null, {signIn})(Login);