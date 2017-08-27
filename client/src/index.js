import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import App from "./App";
import reducer from "./redux/Reducer";
import WS from "./websocket/WebSocket";

const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
	<Provider store={store}>
		<div>
			<WS />
			<App />
		</div>
	</Provider>, document.getElementById("root"));