import React from "react";

export default function TextField(props) {
    return (
        <input
            type="text"
            className={props.className}
            name={props.name}
            placeholder={props.placeholder}
            defaultValue={props.value}
            onChange={props.onChange}
        />
    );
}