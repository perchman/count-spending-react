import React from "react";

export default function NumberField(props) {
    return (
        <input
            type="number"
            className={props.className}
            name={props.name}
            placeholder={props.placeholder}
            defaultValue={props.value}
            onChange={props.onChange}
        />
    );
}