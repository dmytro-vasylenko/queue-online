import React, {Component} from "react";
import axios from "axios";

import {API} from "../constants/config";

class Edit extends Component {
    state = {
        queues: []
    };

    componentWillMount() {
        axios.get(`${API}/teacher-queues?google_token=${localStorage.getItem("google_token")}`).then(response => {
            console.log(response.data);
        });
    }

    render() {
        return <div>{this.state.queues.map((queue, index) => <div>{queue.id}</div>)}</div>;
    }
}

export default Edit;
