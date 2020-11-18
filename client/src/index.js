import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import '../src/styles/index.css'

import reducers from './reducers';
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import 'semantic-ui-css/semantic.min.css'
import '../src/styles/library/swiper/swiper.css';
import '../src/styles/library/swiper/swiper.min.css';
import log from 'loglevel';
import ErrorBoundary from "./ErrorBoundary";

console.log = console.error = console.warn = function() {}
log.disableAll(true)
// log.setLevel("info")

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose();
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <App/>
        </ErrorBoundary>
    </Provider>,
    document.getElementById('root')
);