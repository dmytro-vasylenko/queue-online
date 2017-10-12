import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";

const url = "https://queues-service.herokuapp.com/api/";

class Place extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false
		};

		this.handleTakePlace = this.handleTakePlace.bind(this);
	}

	async handleTakePlace(event) {
		let places = this.props.places;
		let selectedCurrentPlace = places[this.props.id] && places[this.props.id].email != localStorage.getItem("email");
		let userInQueue = Object.keys(places).filter(item => places[item].email == localStorage.getItem("email") && item != this.props.id)[0];
		if(selectedCurrentPlace || userInQueue) {
			return;
		}


		this.setState({loading: true});
		await axios.post(url + "place", {
			place: this.props.id,
			id: this.props["data-queue-id"],
			name: localStorage.getItem("name"),
			photo: localStorage.getItem("photo"),
			email: localStorage.getItem("email")
		});
		this.setState({loading: false});
	}

	render() {
		const info = this.props.places[this.props.id];

		let place;
		let classes = ["place"];

		if(info) {
			place = <img src={info.photo} alt={info.name} title={info.name} />;
		} else {
			classes.push("free");
		}

		if(this.state.loading) {
			classes.push("lds-rolling");
		}

		return <div className={classes.join(" ")} data-id={this.props.id} onClick={this.handleTakePlace}><div/>{place}</div>;
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		places: state.queues[ownProps["data-queue-id"]].places
	};
};

export default connect(mapStateToProps)(Place);