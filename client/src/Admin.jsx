import React, {Component} from "react";

import Header from "./components/Header";
import Add from "./admin/Add";

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs: [
                {title: "Добавить очередь", open: false, content: <Add />},
                {title: "Список очередей", open: false, content: "Удалить..."},
                {title: "Настройки админ-панели", open: false, content: "Настроить..."}
            ]
        };

        this.handleOpen = this.handleOpen.bind(this);
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
        return (
            <div>
                <Header />
                <main>
                    <div className="tabs">
                        {this.state.tabs.map((item, index) => {
                            return (
                                <div className="tab" key={index}>
                                    <div className="title" onClick={e => this.handleOpen(index)}>
                                        {item.title}
                                    </div>
                                    <div className={item.open ? "content content-open" : "content"}>{item.content}</div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>
        );
    }
}

export default Admin;
