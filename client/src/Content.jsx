import React, {Component} from "react";
import {connect} from "react-redux";
import Queue from "./Queue";
import axios from "axios";

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

export default connect(
	state => ({}),
	dispatch => ({
		onAddQueue: (data) => {
			dispatch({type: "SET_QUEUE", payload: data});
		}
	})
)(Content);