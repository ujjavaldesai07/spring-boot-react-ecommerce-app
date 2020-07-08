import React from "react";
import history from "../history";
import {Router, Route} from 'react-router-dom';
import log from "loglevel"
import NavBar from "./routes/navbar/navBar";
import {TabPanelList} from "./routes/navbar/tabPanelList";
import Home from "./routes/home/home";
import Login from "./routes/login";
import SignUp from "./routes/signUp";
import Product from "./routes/product/product";
import Detail from "./routes/detail/detail";
import Checkout from "./routes/checkout";
import {SearchMatchesNotFound} from "./ui/error/searchMatchesNotFound";


const App = () => {
    log.info(`[App]: Rendering App Component window`)
    return (
        <Router history={history}>
            <Route path="/" component={NavBar}/>
            <Route path="/" component={TabPanelList}/>
            <Route path="/" exact component={Home}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/signup" exact component={SignUp}/>
            <Route path="/checkout" exact component={Checkout}/>
            <Route path="/products/details/:checkout" exact component={Checkout}/>
            <Route path="/products/:details" exact component={Detail}/>
            <Route path="/products" exact component={Product}/>
        </Router>
    )
}

export default App;