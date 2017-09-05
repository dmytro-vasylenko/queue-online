import React, {Component} from "react";

class Settings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false,
			name: localStorage.getItem("name")
		};

		this.handleOpen = this.handleOpen.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChangeName = this.onChangeName.bind(this);
	}

	handleOpen() {
		let currentState = this.state.isOpen;
		this.setState({isOpen: !currentState});
	}

	handleSubmit() {
		localStorage.setItem("name", this.state.name);
		this.setState({
			isOpen: false
		});
	}

	onChangeName(e) {
		this.setState({name: e.target.value});
	}

	render() {
		return (
			<div className="settings">
				<h4 onClick={this.handleOpen}>Настройки</h4>
				<div className={this.state.isOpen ? "settings-control settings-open" : "settings-control"}>
					<input type="text" placeholder="Ваше имя..." value={this.state.name} onChange={this.onChangeName} />
					<button onClick={this.handleSubmit}>Сохранить</button>
				</div>
			</div>
		);
	}
}

export default Settings;