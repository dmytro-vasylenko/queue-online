import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";

import Queue from "./Queue";
import * as types from "../../constants/types";
import {API} from "../../constants/config";

class Content extends Component {
    componentWillMount() {
        if (this.props.queues.length) {
            return;
        }

        axios.get(`${API}/queues`).then(request => {
            const queues = request.data;
            for (const queue in queues) {
                this.props.addQueue(queues[queue]);
            }
            document.getElementById("preloader").style.display = "none";
        });
    }

    render() {
        if (!Object.keys(this.props.queues).length) {
            return <div />;
        }

        return (
            <main>
                {Object.keys(this.props.queues).map(item => {
                    return <Queue {...this.props.queues[item]} key={item} />;
                })}
            </main>
        );
    }
}

const mapStateTopProps = state => ({
    queues: state.queues
});

const mapDispatchToProps = dispatch => ({
    addQueue: data => {
        dispatch({type: types.ADD_QUEUE, payload: data});
    }
});

export default connect(mapStateTopProps, mapDispatchToProps)(Content);
