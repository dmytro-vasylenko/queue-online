import React, {Component} from "react";
import axios from "axios";

import {API} from "../../constants/config";

class FreePlace extends Component {
    handleTakePlace = async () => {
        const response = await axios.post(`${API}/place`, {
            google_token: localStorage.getItem("google_token"),
            id: this.props.id
        });
    };

    render() {
        return (
            <div className="place take-place" onClick={this.handleTakePlace}>
                +
            </div>
        );
    }
}

export default FreePlace;
