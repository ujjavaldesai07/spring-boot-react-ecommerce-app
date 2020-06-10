import React from "react";
import NavBar from "./navBar";
import TabDataList from "./tabDataList";
import history from "../history";
import {Router, Route} from 'react-router-dom';
import MainScreen from "./mainScreen";
import LoginScreen from "./loginScreen";
import SignUpScreen from "./signupScreen";
import VerificationScreen from "./verificationScreen";

const App = () => {
    return (
        <div>
            <Router history={history}>
                <Route path="/" component={NavBar}/>
                <Route path="/" component={TabDataList}/>
                <Route path="/" exact component={MainScreen}/>
                <Route path="/login" exact component={LoginScreen}/>
                <Route path="/signup" exact component={SignUpScreen}/>
                <Route path="/verification_email" exact component={VerificationScreen}/>
            </Router>
        </div>
    )
}

export default App;