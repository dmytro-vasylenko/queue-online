import React from "react";

const Place = props => (
    <div className={props.selected ? "place selected-place" : "place"} data-id={props.id}>
        <img src={props.photo} alt={props.name} title={props.name} />
    </div>
);

export default Place;
