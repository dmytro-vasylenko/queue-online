import React, {Component} from "react";
import {connect} from "react-redux";
import moment from "moment";
import "moment/locale/ru";

import Place from "./containers/Place";
import TakePlace from "./components/TakePlace";

class Queue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const {props: data} = this;
        const userEmail = localStorage.getItem("email");

        return (
            <div className="queue">
                <h2>
                    {data.type} на {moment(data.date).format("ll")} по{" "}
                    <span title={data.lesson.name}>{data.lesson.shortName}</span>
                </h2>
                <div className={this.state.isOpen ? "info info-open" : "info"}>
                    {data.subQueue && <h3>Очередь с первым приоритетом</h3>}
                    <div className="people">
                        {data.students.map((student, index) => {
                            return (
                                <Place {...student} id={index + 1} key={index} selected={userEmail === student.email} />
                            );
                        })}
                        <TakePlace id={data.id} />
                    </div>
                    {data.SubQueue && (
                        <div>
                            <h3>Очередь со вторым приоритетом</h3>
                            <div className="people">
                                {data.subQueue.students.map((student, index) => {
                                    return <Place {...student} id={index + 1} key={index} />;
                                })}
                                <TakePlace id={data.subQueue.id} />
                            </div>
                        </div>
                    )}
                </div>
                <button className="open-info" onClick={this.handleClick}>
                    {this.state.isOpen ? "Скрыть" : "Подробней"}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    places: state.queues[ownProps.id]
});

export default connect(mapStateToProps)(Queue);
