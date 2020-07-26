import React from "react";
import history from "../history";
import {Router, Route, Switch} from 'react-router-dom';
import log from "loglevel"
import NavBar from "./routes/navbar/navBar";
import {TabPanelList} from "./routes/navbar/tabPanelList";
import Home from "./routes/home/home";
import Login from "./routes/login";
import SignUp from "./routes/signUp";
import Product from "./routes/product/product";
import ProductDetail from "./routes/detail/productDetails";
import Checkout from "./routes/checkout/checkout";
import ShoppingBag from "./routes/shoppingBag";
import {SuccessPayment} from "./routes/successPayment";
import {CancelPayment} from "./routes/cancelPayment";
import {BadRequest} from "./ui/error/badRequest";

const App = () => {
    log.info(`[App]: Rendering App Component window`)

    return (
        <Router history={history}>
            <NavBar/>
            <TabPanelList/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/signup" exact component={SignUp}/>
                <Route path="/shopping-bag" exact component={ShoppingBag}/>
                <Route path="/checkout" exact component={Checkout}/>
                <Route path="/products/details/shopping-bag" exact component={ShoppingBag}/>
                <Route path="/products/:details" exact component={ProductDetail}/>
                <Route path="/products" exact component={Product}/>
                <Route path="/checkout/success-payment/:id" exact component={SuccessPayment}/>
                <Route path="/checkout/cancel-payment" exact component={CancelPayment}/>
                <Route path="*" exact component={BadRequest}/>
            </Switch>
        </Router>
    )
}

export default App;