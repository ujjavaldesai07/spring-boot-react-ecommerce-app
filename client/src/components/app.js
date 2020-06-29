import React from "react";
import history from "../history";
import {Router, Route} from 'react-router-dom';
import log from "loglevel"
import NavBar from "./routes/navbar/navBar";
import TabPanelList from "./routes/navbar/tabPanelList";
import Home from "./routes/home/home";
import Login from "./routes/login";
import SignUp from "./routes/signUp";
import Product from "./routes/product/product";
import Detail from "./routes/detail/detail";


const App = () => {
    log.info(`[App]: Rendering App Component window`)
    return (
            <Router history={history}>
                <Route path="/" component={NavBar}/>
                <Route path="/" component={TabPanelList}/>
                <Route path="/" exact component={Home}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/signup" exact component={SignUp}/>
                <Route path="/:products" exact component={Product}/>
                <Route path="/products/:detail" exact component={Detail}/>
            </Router>
    )
}

export default App;