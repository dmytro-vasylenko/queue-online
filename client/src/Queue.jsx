import React, {Component} from "react";
import {connect} from "react-redux";
import Place from "./Place";

class Queue extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		var places = [];
		for(var i = 0; i < this.props.countOfPlaces; i++) {
			places.push(<Place id={i} key={i} data-queue-id={this.props["data-id"]} />);
		}

		return (
			<div className="queue">
				<h2>{this.props.title}</h2>
				<div className={this.state.isOpen ? "info info-open" : "info"}>
					<div className="people">
					{places}
					</div>
				</div>
				<button className="open-info" onClick={this.handleClick}>{this.state.isOpen ? "Скрыть" : "Подробней"}</button>
			</div>
			);
	}
}

export default connect(
	(state, ownProps) => ({
		places: state.queues[ownProps["data-id"]]
	}),
	dispatch => ({})
)(Queue);