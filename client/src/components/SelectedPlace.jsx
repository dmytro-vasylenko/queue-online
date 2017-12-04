import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";

import {API} from "../constants/config";
import {REMOVE_PLACE} from "../constants/types";

class SelectedPlace extends Component {
    handleUnplace = () => {
        axios.delete(`${API}/place`, {
            data: {
                google_token: localStorage.getItem("google_token"),
                id: this.props.queueId
            }
        });
        this.props.removePlace(this.props.queueId, this.props.id - 1);
    };

    render() {
        return (
            <div className="place selected-place" data-id={this.props.id} onClick={this.handleUnplace}>
                <img src={this.props.photo} alt={this.props.name} title={this.props.name} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    removePlace: (queueId, placeId) => dispatch({type: REMOVE_PLACE, payload: {queueId, placeId}})
});

export default connect(null, mapDispatchToProps)(SelectedPlace);
