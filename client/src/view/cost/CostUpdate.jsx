import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import CostForm from "../../framework/components/forms/CostForm.jsx";

export default function CostUpdate() {
    const {uuid} = useParams();
    const [cost, setCost] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/costs?uuid=${uuid}`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                if (data) {
                    setCost(data);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handelSubmit = async (data, setResponseError) => {
        fetch(`http://localhost:5000/costs?uuid=${uuid}`, {
            method: 'PUT',
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
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <h1>Update cost</h1>
            <CostForm cost={cost} onSubmit={handelSubmit}/>
        </>
    );
}