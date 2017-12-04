import React, {Component} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import axios from "axios";

import {GOOGLE_API} from "../constants/config";
import {UPDATE_QUEUES} from "../constants/types";
import GoogleButton from "../containers/GoogleButton";

class Header extends Component {
    state = {
        user: null
    };

    async componentDidMount() {
        const token = localStorage.getItem("google_token");
        if (token) {
            try {
                const user = (await axios.get(GOOGLE_API(token))).data;
                localStorage.setItem("email", user.email);
                this.setState({
                    user: {
                        email: user.email,
                        name: user.name
                    }
                });
            } catch (error) {
                console.error(error);
                this.clearLocalStorage();
            }
        }
    }

    onSignIn(googleUser) {
        const user = googleUser.getBasicProfile();
        localStorage.setItem("google_token", googleUser.getAuthResponse().access_token);
        localStorage.setItem("email", user.getEmail());
        this.setState({
            user: {
                email: user.getEmail(),
                name: user.getName()
            }
        });
        this.props.updateQueues();
    }

    onLogout() {
        this.setState({user: null});
        this.clearLocalStorage();
        this.props.updateQueues();
    }

    onFailure(error) {
        console.error(error);
    }

    clearLocalStorage() {
        localStorage.clear("google_token");
        localStorage.clear("email");
    }

    render() {
        const menus = [
            {title: "Главная", link: "/"}
            // {title: "Админ-панель", link: "/admin"}
        ];

        return (
            <header>
                <div className="container">
                    <nav>
                        {menus.map((item, index) => {
                            return (
                                <Link to={item.link} key={index}>
                                    {item.title}
                                </Link>
                            );
                        })}
                    </nav>
                    <GoogleButton
                        onSignIn={this.onSignIn.bind(this)}
                        onLogout={this.onLogout.bind(this)}
                        user={this.state.user}
                        onFailure={this.onFailure.bind(this)}
                    />
                </div>
            </header>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateQueues: () => dispatch({type: UPDATE_QUEUES})
});

export default connect(null, mapDispatchToProps)(Header);
