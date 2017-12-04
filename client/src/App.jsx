import React, {Component} from "react";

import "./style/App.css";
import Content from "./Content";
import Header from "./components/Header";
// import WS from "./websocket/WebSocket";

class App extends Component {
    render() {
        return (
            <div id="wrapper">
                {/*<WS />*/}
                <Header />
                <Content />
            </div>
        );
    }
}

export default App;
