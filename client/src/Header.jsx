import React, {Component} from "react";

import Settings from "./Settings";

/* global gapi */

class Sidebar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			menus: [
				{title: "Главная", link: "#"},
				{title: "Контакты", link: "#"},
				{title: "Создать", link: "#"}
			]
		};
	}

	onSignIn(googleUser) {
		var profile = googleUser.getBasicProfile();
		localStorage.setItem("name", profile.getName());
		localStorage.setItem("photo", profile.getImageUrl());
		localStorage.setItem("email", profile.getEmail());
	}

	componentDidMount() {
		gapi.signin2.render("g-signin2", {
			"scope": "https://www.googleapis.com/auth/plus.login",
			"width": 240,
			"height": 50,
			"longtitle": true,
			"theme": "light",
			"onsuccess": this.onSignIn
		});
	}

	render() {
		return (
			<header>
				<div className="container">
					<nav>
						{this.state.menus.map((item, index) => {
							return <a href={item.link} key={index}>{item.title}</a>;
						})}
					</nav>
					<Settings />
					<div id="g-signin2" data-onsuccess={this.onSignIn} />
				</div>
			</header>
		);
	}
}

export default Sidebar;
