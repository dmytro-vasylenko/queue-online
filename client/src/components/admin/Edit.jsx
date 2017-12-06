import React, {Component} from "react";
import axios from "axios";

import {API} from "../../constants/config";
import Queue from "./Queue";

class Edit extends Component {
    state = {
        queues: []
    };

    componentWillMount() {
        axios.get(`${API}/teacher-queues?google_token=${localStorage.getItem("google_token")}`).then(response => {
            this.setState({queues: response.data});
        });
    }

    render() {
        return <div>{this.state.queues.map((queue, index) => <Queue {...queue} key={index} />)}</div>;
    }
}

export default Edit;
