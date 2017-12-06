import React, {Component} from "react";
import {hashHistory} from "react-router";
import Select from "react-select-me";
import Calendar from "react-calendar";
import axios from "axios";

import {API} from "../constants/config";
import "react-select-me/src/ReactSelectMe.css";

class Add extends Component {
    state = {
        type: null,
        types: [],
        lesson: null,
        lessons: [],
        group: null,
        groups: [],
        classRoom: "",
        date: null,
        subQueue: false
    };

    componentWillMount() {
        axios.get(`${API}/lessons-types`).then(response => {
            response.data.forEach(type => {
                type.label = type.name;
                type.value = type.id;
            });
            this.setState({types: response.data});
        });
        axios.get(`${API}/teacher-lessons?google_token=${localStorage.getItem("google_token")}`).then(response => {
            response.data.forEach(lesson => {
                lesson.label = lesson.name;
                lesson.value = lesson.id;
            });
            this.setState({lessons: response.data});
        });
    }

    handleCreateQueue(event) {
        event.preventDefault();
        const {type, lesson, group, date, classRoom, subQueue} = this.state;
        if (!type || !lesson || !group || !date || !classRoom) {
            return alert("Не заполнены все поля");
        }

        axios
            .post(`${API}/queue`, {
                google_token: localStorage.getItem("google_token"),
                type_lesson: type.id,
                lesson: lesson.id,
                group_id: group.id,
                date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
                class_room: classRoom,
                sub_queue: subQueue
            })
            .then(response => {
                if (response.data === "OK") {
                    this.setState({
                        type: null,
                        lesson: null,
                        group: null,
                        classRoom: "",
                        date: null,
                        subQueue: false
                    });
                    return alert("Очередь успешно создана");
                }
                alert("Произошла ошибка, попробуйте позже");
            });
    }

    selectLesson(value) {
        this.setState({lesson: value});
        axios.get(`${API}/lesson-groups?lesson=${value.id}`).then(response => {
            response.data.forEach(group => {
                group.label = group.code;
                group.value = group.id;
            });
            this.setState({groups: response.data});
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={event => this.handleCreateQueue(event)}>
                    <Select
                        placeholder="Выберите тип занятия"
                        value={this.state.type}
                        onChange={value => this.setState({type: value})}
                        options={this.state.types}
                    />
                    <Select
                        placeholder="Выберите предмет"
                        value={this.state.lesson}
                        onChange={value => this.selectLesson(value)}
                        options={this.state.lessons}
                    />
                    {this.state.lesson && (
                        <Select
                            placeholder="Выберите группу"
                            value={this.state.group}
                            onChange={value => this.setState({group: value})}
                            options={this.state.groups}
                        />
                    )}
                    <input
                        type="text"
                        value={this.state.classRoom}
                        onChange={text => this.setState({classRoom: text.target.value})}
                        placeholder="Аудитория"
                    />
                    <Calendar onChange={date => this.setState({date})} value={this.state.date} />
                    <div>
                        <input
                            type="checkbox"
                            id="sub-queue"
                            checked={this.state.subQueue}
                            onChange={value => this.setState({subQueue: value.target.checked})}
                        />
                        <label htmlFor="sub-queue">Создать очередь со вторым приоритетом?</label>
                    </div>
                    <input className="btn" type="submit" value="Создать" />
                </form>
            </div>
        );
    }
}

export default Add;
