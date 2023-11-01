import React from "react";

import Grid from "../../framework/components/grid/Grid.jsx";

import style from "../Page.module.css";

const config = {
    requestEndpoint: 'http://localhost:5000/balance/history',
    fields: {
        date: {
            text: 'Date',
            sort: true,
            value: (historyBalanceChange) => {
                return new Date(historyBalanceChange.date).toLocaleDateString();
            }
        },
        type: {
            text: 'Type',
            sort: false,
            value: (historyBalanceChange) => {
                return historyBalanceChange.type;
            }
        },
        amount: {
            text: 'Amount',
            sort: true,
            value: (historyBalanceChange) => {
                return historyBalanceChange.amount;
            }
        }
    },
    options: {
        sort: {
            default: {key: 'date', direction: 'desc'}
        },
        pageSize: 5
    },
    buttons: []
}

export default function BalanceHistory() {
    return (
        <>
            <h1>History</h1>
            <Grid
                requestEndpoint={config.requestEndpoint}
                fields={config.fields}
                options={config.options}
                buttons={config.buttons}
            />
        </>
    );
}