import React, {Component} from "react";
import moment from "moment";
import "moment/locale/ru";

import Place from "./containers/Place";
import FreePlace from "./components/FreePlace";
import SelectedPlace from "./components/SelectedPlace";

class Queue extends Component {
    constructor(props) {
        super(props);

        this.state = {isOpen: false};

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        const data = this.props;
        const userEmail = localStorage.getItem("email");

        if (!data) {
            return <div />;
        }

        return (
            <div className="queue">
                <h2>
                    {data.lessonType} на {moment(data.date).format("ll")} по{" "}
                    <span title={data.lessonName}>{data.lessonShortName}</span>
                </h2>
                <div className={this.state.isOpen ? "info info-open" : "info"}>
                    {data.subQueue && <h3>Очередь с первым приоритетом</h3>}
                    <div className="people">
                        {data.students.map((student, index) => {
                            if (userEmail === student.email) {
                                return <SelectedPlace {...student} id={index + 1} key={index} queueId={data.id} />;
                            }
                            return (
                                <Place {...student} id={index + 1} key={index} selected={userEmail === student.email} />
                            );
                        })}
                        <FreePlace id={data.id} />
                    </div>
                    {data.SubQueue && (
                        <div>
                            <h3>Очередь со вторым приоритетом</h3>
                            <div className="people">
                                {data.subQueue.students.map((student, index) => {
                                    return (
                                        <Place
                                            {...student}
                                            id={index + 1}
                                            key={index}
                                            selected={userEmail === student.email}
                                        />
                                    );
                                })}
                                <FreePlace id={data.subQueue.id} />
                            </div>
                        </div>
                    )}
                </div>
                <button className="btn open-info" onClick={this.handleClick}>
                    {this.state.isOpen ? "Скрыть" : "Подробней"}
                </button>
            </div>
        );
    }
}

export default Queue;
