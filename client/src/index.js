import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {Router, Route, hashHistory} from "react-router";

import reducer from "./store";
import App from "./App";
import Admin from "./components/admin";

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} onUpdate={() => window.scrollTo(0, 0)}>
            <Route path="/" component={App} />
            <Route path="/admin" component={Admin} />
        </Router>
    </Provider>,
    document.getElementById("root")
);
