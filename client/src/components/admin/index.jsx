import React, {Component} from "react";
import axios from "axios";
import {hashHistory} from "react-router";

import Header from "../header";
import Add from "./Add";
import Edit from "./Edit";
import {API} from "../../constants/config";

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teacher: false,
            tabs: [
                {title: "Добавить очередь", open: false, content: <Add />},
                {title: "Список очередей", open: false, content: <Edit />},
                {title: "Настройки админ-панели", open: false, content: "Настроить..."}
            ]
        };

        this.handleOpen = this.handleOpen.bind(this);
    }

    async componentWillMount() {
        const google_token = localStorage.getItem("google_token");
        const userType = (await axios.get(`${API}/whois?google_token=${google_token}`)).data;
        if (userType !== "teacher") {
            hashHistory.push("/");
        } else {
            this.setState({teacher: true});
        }
    }

    componentDidMount() {
        document.getElementById("preloader").style.display = "none";
    }

    handleOpen(index) {
        let tab = this.state.tabs[index];
        tab.open = !tab.open;
        this.setState({tab});
    }

    render() {
        if (!this.state.teacher) {
            return <div />;
        }

        return (
            <div>
                <Header />
                <main>
                    <div className="tabs">
                        {this.state.tabs.map((item, index) => (
                            <div className="tab" key={index}>
                                <div className="title" onClick={e => this.handleOpen(index)}>
                                    {item.title}
                                </div>
                                <div className={item.open ? "content content-open" : "content"}>{item.content}</div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        );
    }
}

export default Admin;
