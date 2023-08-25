import React from "react";
import {Link} from "react-router-dom";

import Grid from "../../framework/components/grid/Grid.jsx";
import GridUpdateButton from "../../framework/components/grid/buttons/update/GridUpdateButton.jsx";
import GridDeleteButton from "../../framework/components/grid/buttons/delete/GridDeleteButton.jsx";

import style from "../Page.module.css";
import DataProvider from "../../framework/DataProvider";
import Cost from "../../entities/Cost";

export default function CostIndex() {
    return (
        <>
            <h1>Costs</h1>
            <Link to="/cost/create" className={style['btn-add']}>Add</Link>
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
        date: {
            text: 'Date',
            sort: true,
            value: (cost) => {
                return cost.date.toLocaleDateString();
            }
        },
        category: {
            text: 'Category',
            sort: false,
            value: (cost) => {
                return cost.getCategoryName();
            }
        },
        price: {
            text: 'Price',
            sort: true,
            value: (cost) => {
                return cost.price;
            }
        },
        description: {
            text: 'Description',
            sort: false,
            value: (cost) => {
                return cost.description;
            }
        }
    },
    dataProvider: new DataProvider({
        model: Cost,
        sort: {
            default: {key: 'date', direction: 'desc'}
        },
        pagination: {
            pageSize: 5
        }
    }),
    buttons: [
        {
            key: 'update',
            component: GridUpdateButton,
            createUrl: (id) => {
                return `/cost/update/${id}`
            }
        },
        {
            key: 'delete',
            component: GridDeleteButton,
            createUrl: (id) => {
                return `/cost/delete/${id}`
            }
        }
    ]
}