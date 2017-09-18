import React, {Component} from "react";
import axios from "axios";

const URL = "http://localhost:3001/api";

class Add extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "",
			quantityOfPlaces: "",
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
		this.setState({quantityOfPlaces: e.target.value});
	}

	handleCreate() {
		let {state: queue} = this;
		if(queue.title && queue.date && queue.quantityOfPlaces) {
			axios.post(`${URL}/queues`, {
				title: queue.title,
				date: queue.date,
				quantityOfPlaces: queue.quantityOfPlaces
			}).then(response => {
				alert("Очередь была успешно добавлена");
				this.setState({
					title: "",
					quantityOfPlaces: "",
					date: ""
				});
			})
		} else {
			alert("Вы не заполнили все поля");
		}
	}

	render() {
		return (
			<div>
				<input type="text" value={this.state.title} onChange={this.changeTitle} placeholder="Название очереди" />
				<div className="center-block">
					<input type="date" value={this.state.date} onChange={this.changeDate} placeholder="Дата открытия" />
					<input type="number" value={this.state.quantityOfPlaces} onChange={this.changeQuantity} placeholder="Количество мест"/>
				</div>
				<button onClick={this.handleCreate}>Создать</button>
			</div>
		);
	}
}

export default Add;