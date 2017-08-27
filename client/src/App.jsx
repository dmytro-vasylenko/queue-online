import React, { Component } from "react";
import "./style/App.css";
import Content from "./Content";
import Header from "./Header";

class App extends Component {
	render() {
		return (
			<div id="wrapper">
				<Header />
				<Content />
			</div>
		);
	}
}

export default App;
