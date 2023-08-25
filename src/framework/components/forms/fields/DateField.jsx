import React from "react";

export default function DateField(props) {
    return (
        <input
            type="date"
            className={props.className}
            name={props.name}
            defaultValue={props.value}
            onChange={props.onChange}
        />
    );
}