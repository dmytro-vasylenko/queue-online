import React, {Component} from "react";
import {connect} from "react-redux";

const NEW_PLACE = "NEW_PLACE";
const REMOVE_PLACE = "REMOVE_PLACE";

class WS extends Component {
	io = window.io.connect("http://localhost:3001/");

	componentDidMount() {
		this.io.on(NEW_PLACE, data => {
			this.props.onSetPlace(data);
		});

		this.io.on(REMOVE_PLACE, data => {
			this.props.onRemovePlace(data);
		});
	}

	render() {
		return <div/>;
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onSetPlace: data => {
			dispatch({type: "SET_PLACE", payload: data});
		},
		onRemovePlace: data => {
			dispatch({type: "REMOVE_PLACE", payload: data});
		}
	};
};

export default connect(null, mapDispatchToProps)(WS);
