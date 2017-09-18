import React, {Component} from "react";
import {Link} from "react-router";

import Settings from "./Settings";

/* global gapi */

class Sidebar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			menus: [
				{title: "Главная", link: "/"},
				{title: "Контакты", link: "#"},
				{title: "Админ-панель", link: "/admin"}
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
		// gapi.signin2.render("g-signin2", {
		// 	"scope": "https://www.googleapis.com/auth/plus.login",
		// 	"width": 240,
		// 	"height": 50,
		// 	"longtitle": true,
		// 	"theme": "light",
		// 	"onsuccess": this.onSignIn
		// });
	}

	render() {
		let isLogin = localStorage.getItem("email") && localStorage.getItem("name") && localStorage.getItem("photo");
		return (
			<header>
				<div className="container">
					<nav>
						{this.state.menus.map((item, index) => {
							return <Link to={item.link} key={index}>{item.title}</Link>;
						})}
					</nav>
					{isLogin && <Settings />}
					<div id="g-signin2" data-onsuccess={this.onSignIn} />
				</div>
			</header>
		);
	}
}

export default Sidebar;
