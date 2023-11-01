import React from "react";
import {useNavigate} from "react-router-dom";

import BalanceForm from "../../framework/components/forms/BalanceForm.jsx";

export default function BalanceReplenish() {
    const navigate = useNavigate();

    const handelSubmit =  async (data) => {
        fetch('http://localhost:5000/balance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
        })
            .then((res) => {
                if (res.status === 200) {
                    navigate("/balance/index");
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <h1>Replenish balance</h1>
            <BalanceForm onSubmit={handelSubmit}/>
        </>
    );
}