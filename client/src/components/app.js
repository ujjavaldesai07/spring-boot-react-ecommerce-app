import React, {Suspense, lazy} from "react";
import history from "../history";
import {Router, Route} from 'react-router-dom';
import log from "loglevel"
import Spinner from "./ui/spinner";

const NavBar = lazy(() => import('./routes/navBar'));
const TabPanelList = lazy(() => import('./ui/tabPanelList'));
const MainScreen = lazy(() => import('./routes/home/home'));
const LoginScreen = lazy(() => import('./routes/login'));
const SignUpScreen = lazy(() => import('./routes/signUp'));
const FilterScreen = lazy(() => import('./routes/product/product'));

const App = () => {
    log.info(`[App]: Rendering App Component`)
    return (
        <Suspense fallback={<Spinner minHeight="100vh"/>}>
            <Router history={history}>
                <Route path="/" component={NavBar}/>
                <Route path="/" component={TabPanelList}/>
                <Route path="/" exact component={MainScreen}/>
                <Route path="/login" exact component={LoginScreen}/>
                <Route path="/signup" exact component={SignUpScreen}/>
                <Route path="/:products" component={FilterScreen}/>
            </Router>
        </Suspense>
    )
}

export default App;