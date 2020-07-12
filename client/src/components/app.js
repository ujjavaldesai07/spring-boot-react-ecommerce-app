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
import Detail from "./routes/detail/productDetails";
import Checkout from "./routes/checkout";
import ShoppingBag from "./routes/shoppingBag";


const App = () => {
    log.info(`[App]: Rendering App Component window`)
    return (
        <Router history={history}>
            <Route path="/" component={NavBar}/>
            <Route path="/" component={TabPanelList}/>
            <Route path="/" exact component={Home}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/signup" exact component={SignUp}/>
            <Route path="/shopping-bag" exact component={ShoppingBag}/>
            <Route path="/checkout" exact component={Checkout}/>
            <Route path="/products/details/:shopping-bag" exact component={ShoppingBag}/>
            <Route path="/products/:details" exact component={Detail}/>
            <Route path="/products" exact component={Product}/>
        </Router>
    )
}

export default App;