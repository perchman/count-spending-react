import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import CostForm from "../../framework/components/forms/CostForm.jsx";

export default function CostCreate() {
    const navigate = useNavigate();

    const handelSubmit = (data, setResponseError) => {
        fetch('http://localhost:5000/costs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                if (res.status === 200) {
                    navigate("/");
                }
                if (res.status === 500) {
                    return res.json();
                }
            })
            .then((data) => {
                if (data) {
                    if (data.err) {
                        setResponseError(data.err);
                    }
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <h1>Create cost</h1>
            <CostForm cost={{}} onSubmit={handelSubmit}/>
        </>
    );
}