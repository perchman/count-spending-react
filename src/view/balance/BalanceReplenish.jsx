import React from "react";
import {useNavigate} from "react-router-dom";

import BalanceForm from "../../framework/components/forms/BalanceForm.jsx";

import Balance from "../../entities/balance/Balance";

export default function BalanceReplenish() {
    const navigate = useNavigate();

    const handelSubmit =  async (formData) => {
        const balance = new Balance();

        await balance.increase(
            parseInt(formData.replenish),
            new Date(formData.date),
            'replenishment'
        )

        navigate("/balance/index");
    }

    return (
        <>
            <h1>Replenish balance</h1>
            <BalanceForm onSubmit={handelSubmit}/>
        </>
    );
}