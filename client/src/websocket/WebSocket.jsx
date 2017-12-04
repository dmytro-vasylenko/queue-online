import React, {Component} from "react";
import {connect} from "react-redux";
import openSocket from "socket.io-client";

import {SOCKET} from "../constants/config";

const NEW_PLACE = "NEW_PLACE";
const REMOVE_PLACE = "REMOVE_PLACE";
const NEW_QUEUE = "NEW_QUEUE";

class WS extends Component {
    io = openSocket(SOCKET);
    componentDidMount() {
        this.io.on(NEW_PLACE, data => this.props.onSetPlace(data));
        this.io.on(REMOVE_PLACE, data => this.props.onRemovePlace(data));
        this.io.on(NEW_QUEUE, data => this.props.onNewQueue(data));
    }

    render() {
        return <div />;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetPlace: data => {
            dispatch({type: "SET_PLACE", payload: data});
        },
        onRemovePlace: data => {
            dispatch({type: "REMOVE_PLACE", payload: data});
        },
        onNewQueue: data => {
            dispatch({type: "SET_QUEUE", payload: data});
        }
    };
};

export default connect(null, mapDispatchToProps)(WS);
