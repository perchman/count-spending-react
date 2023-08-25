import React from "react";
import {Link} from "react-router-dom";

import Grid from "../../framework/components/grid/Grid.jsx";
import GridDeleteButton from "../../framework/components/grid/buttons/delete/GridDeleteButton.jsx";

import DataProvider from "../../framework/DataProvider";
import HistoryBalanceChange from "../../entities/balance/HistoryBalanceChange";

import style from "../Page.module.css";

export default function BalanceHistory() {
    return (
        <>
            <h1>History</h1>
            <Grid
                fields={config.fields}
                dataProvider={config.dataProvider}
                buttons={config.buttons}
            />
        </>
    );
}

const config = {
    fields: {
        id: {
            text: 'Id',
            sort: true,
            value: (historyBalanceChange) => {
                return historyBalanceChange.id;
            }
        },
        date: {
            text: 'Date',
            sort: true,
            value: (historyBalanceChange) => {
                return historyBalanceChange.date.toLocaleDateString();
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
    dataProvider: new DataProvider({
        model: HistoryBalanceChange,
        sort: {
            default: {key: 'id', direction: 'desc'}
        },
        pagination: {
            pageSize: 5
        }
    }),
    buttons: [
        {
            key: 'delete',
            component: GridDeleteButton,
            createUrl: (id) => {
                return `/balance/history/delete/${id}`
            }
        }
    ]
}