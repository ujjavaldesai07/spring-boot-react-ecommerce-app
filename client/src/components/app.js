import React from "react";
import NavBar from "./screens/navBar";
import TabPanelList from "./parts/tabPanelList";
import history from "../history";
import {Router, Route} from 'react-router-dom';
import MainScreen from "./screens/main/mainScreen";
import LoginScreen from "./screens/loginScreen";
import SignUpScreen from "./screens/signupScreen";
import FilterScreen from "./screens/filter/filterScreen";

const App = () => {
    return (
        <div>
            <Router history={history}>
                <Route path="/" component={NavBar}/>
                <Route path="/" component={TabPanelList}/>
                <Route path="/" exact component={MainScreen}/>
                <Route path="/login" exact component={LoginScreen}/>
                <Route path="/signup" exact component={SignUpScreen}/>
                <Route path="/:products" component={FilterScreen}/>
            </Router>
        </div>
    )
}

export default App;