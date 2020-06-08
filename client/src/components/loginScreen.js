import React from "react";
import WebForm from "./webForm";
import {connect} from 'react-redux';
import {signIn} from "../actions";
import {Divider, Form, Grid} from "semantic-ui-react";
import {Typography} from "@material-ui/core";
import {StyledWebButton} from "../styles/contentScreenStyles";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";

const LoginScreen = () => {
    return (
        <Grid stackable>
            <Grid.Row centered>


                <Grid.Column width={4}/>
            </Grid.Row>
        </Grid>
    )
}

export default connect(null, {signIn})(LoginScreen);