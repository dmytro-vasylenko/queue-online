import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";

import Queue from "./Queue";
import * as types from "./constants/types";

const url = "http://localhost:3001/api/";

class Content extends Component {
	constructor(props) {
		super(props);

		this.state = {
			queues: null
		};
	}

	componentWillMount() {
		axios.get(url + "queues").then(queues => {
			this.setState({
				queues: queues.data.map((item, id) => {
					this.props.onAddQueue(item);
					return <Queue title={item.title} countOfPlaces={item.countOfPlaces} key={id} data-id={item.id} />;
				})
			});
			document.getElementById("preloader").style.display = "none";
		});
	}

	render() {
		return (
			<main>
				{this.state.queues}
			</main>
			);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAddQueue: (data) => {
			dispatch({type: types.SET_QUEUE, payload: data});
		}
	};
};

export default connect(null, mapDispatchToProps)(Content);