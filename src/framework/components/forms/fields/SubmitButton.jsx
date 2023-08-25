import React from "react";

export default function SubmitButton(data) {

    return (
        <button type="submit" className={data.className}>
            {data.text}
        </button>
    );
}