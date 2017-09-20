import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";

import Queue from "./Queue";
import * as types from "./constants/types";

const URL = "http://localhost:3001/api";

class Content extends Component {
	constructor(props) {
		super(props);

		this.state = {
			queues: null
		};
	}

	componentWillMount() {
		if(!Object.keys(this.props.queues).length) {
			axios.get(`${URL}/queues`).then(queues => {
				queues.data.forEach(item => {
					this.props.onAddQueue(item);
				});
				document.getElementById("preloader").style.display = "none";
			});
		}
	}

	render() {
		return (
			<main>
				{Object.keys(this.props.queues).map((item, index) => {
					let queue = this.props.queues[item];
					return <Queue title={queue.title} countOfPlaces={queue.countOfPlaces} key={index} data-id={queue.id} />;
				})}
			</main>
		);
	}
}

const mapStateTopProps = state => {
	return {
		queues: state.queues
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAddQueue: (data) => {
			dispatch({type: types.SET_QUEUE, payload: data});
		}
	};
};

export default connect(mapStateTopProps, mapDispatchToProps)(Content);