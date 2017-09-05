import React, {Component} from "react";
import {connect} from "react-redux";


class WS extends Component {
	io = window.io.connect("http://localhost:3001/");

	componentDidMount() {
		this.io.on("NEW_PLACE", data => {
			this.props.onSetPlace(data);
		});
	}

	render() {
		return <div/>;
	}
};

export default connect(
	state => ({}),
	dispatch => ({
		onSetPlace: (data) => {
			dispatch({type: "SET_PLACE", payload: data});
		}
	})
)(WS);
