import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";

const url = "http://localhost:3001/api/";

class Place extends Component {
	constructor(props) {
		super(props);

		this.handleTakePlace = this.handleTakePlace.bind(this);
	}

	handleTakePlace(event) {
		axios.post(url + "place", {
			place: this.props.id,
			id: this.props["data-queue-id"],
			name: localStorage.getItem("name"),
			photo: localStorage.getItem("photo"),
			email: localStorage.getItem("email")
		}).then(response => {
			console.log(response);
		});
	}

	render() {
		if(this.props.info) {
			return (
				<div className="place" data-id={this.props.id} onClick={this.handleTakePlace}>
					<img src={this.props.info.photo} alt={this.props.info.name} />
				</div>
			);
		} else {
			return <div className="place free" data-id={this.props.id} onClick={this.handleTakePlace}></div>;
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		info: state.queues[ownProps["data-queue-id"]].places[ownProps.id]
	};
};

export default connect(mapStateToProps)(Place);