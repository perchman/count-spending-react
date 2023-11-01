"use strict"

import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import style from "../Page.module.css";

export default function BalanceIndex() {
    const [balance, setBalance] = useState();

    useEffect(() => {
        fetch('http://localhost:5000/balance')
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then((data) => {
                if (data) {
                    setBalance(data);
                }
            })
            .catch(err => console.log(err));
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