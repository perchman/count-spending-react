"use strict"

import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import Balance from "../../entities/balance/Balance";

import style from "../Page.module.css";

export default function BalanceIndex() {
    const [balance, setBalance] = useState();

    useEffect(() => {
        const balance = new Balance();
        balance.getValue().then((balance) => {
            setBalance(balance);
        })
    })

    return (
        <>
            <h1>Balance: {balance}</h1>
            <div>
                <Link to="/balance/replenish" className={style['btn-add']}>Replenish</Link>
                <Link to="/balance/history" className={style['btn-add']}>History</Link>
            </div>
        </>
    );
}