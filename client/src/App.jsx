import React, {Component} from "react";

import "./style/App.min.css";
import Content from "./components/queues";
import Header from "./components/header";
import WS from "./components/websockets";

class App extends Component {
    render() {
        return (
            <div id="wrapper">
                <WS />
                <Header />
                <Content />
            </div>
        );
    }
}

export default App;
