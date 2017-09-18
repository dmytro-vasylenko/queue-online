import React, {Component} from "react";

class Add extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "",
			quantityOfPlace: "",
			date: ""
		};

		this.handleCreate = this.handleCreate.bind(this);
		this.changeTitle = this.changeTitle.bind(this);
		this.changeDate = this.changeDate.bind(this);
		this.changeQuantity = this.changeQuantity.bind(this);
	}

	changeTitle(e) {
		this.setState({title: e.target.value});
	}

	changeDate(e) {
		this.setState({date: e.target.value});
	}

	changeQuantity(e) {
		this.setState({quantityOfPlace: e.target.value});
	}

	handleCreate() {
		console.log(this.state);
	}

	render() {
		return (
			<div>
				<input type="text" value={this.state.title} onChange={this.changeTitle} placeholder="Название очереди" />
				<div className="center-block">
					<input type="date" value={this.state.date} onChange={this.changeDate} placeholder="Дата открытия" />
					<input type="number" value={this.state.quantityOfPlace} onChange={this.changeQuantity} placeholder="Количество мест"/>
				</div>
				<button onClick={this.handleCreate}>Создать</button>
			</div>
		);
	}
}

export default Add;