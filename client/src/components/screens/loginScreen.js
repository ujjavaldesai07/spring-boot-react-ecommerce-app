import React from "react";
import WebForm from "../parts/webForm";
import {Divider, Grid} from "semantic-ui-react";
import {connect} from 'react-redux';
import {signIn} from "../../actions";
import {StyledLoginScreenGrid, StyledWebButton} from "../../styles/semanticUI/customStyles";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import {Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

const LoginScreen = (props) => {
    const onSubmit = formValues => {
        props.signIn(formValues)
    };

    return (
        <StyledLoginScreenGrid centered>
            <Grid.Row>
                <Grid.Column width={4}>
                    <WebForm onSubmit={onSubmit}
                             formName='signin'
                             headerTitle='Sign In'
                             fields={['Username', 'Password']}
                             forgotPasswordField={true}
                             buttonText="Log in"
                    />

                    <Grid.Column width={14}>
                        <Divider horizontal>Or</Divider>
                    </Grid.Column>

                    <Grid centered padded="vertically">
                        <Grid.Column width={7}>
                            <StyledWebButton color='google plus'>
                                <Icon name='google plus'/> Google
                            </StyledWebButton>
                        </Grid.Column>
                    </Grid>

                    <Grid centered>
                        <Grid.Column width={9}>
                            <Typography style={{paddingBottom: '10px', fontWeight: 'bold'}} variant="subtitle2">
                                Not on Shoppers yet?
                                <Link to="/signup"> Sign up</Link>
                            </Typography>
                        </Grid.Column>
                    </Grid>


                    {/*<Dimmer active={loading}>*/}
                    {/*    <Loader size='large'>Loading</Loader>*/}
                    {/*</Dimmer>*/}
                </Grid.Column>
            </Grid.Row>
        </StyledLoginScreenGrid>
    )
}

export default connect(null, {signIn})(LoginScreen);