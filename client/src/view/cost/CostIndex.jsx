import React from "react";
import {Link} from "react-router-dom";

import Grid from "../../framework/components/grid/Grid.jsx";
import GridUpdateButton from "../../framework/components/grid/buttons/update/GridUpdateButton.jsx";
import GridDeleteButton from "../../framework/components/grid/buttons/delete/GridDeleteButton.jsx";

import style from "../Page.module.css";

const config = {
    requestEndpoint: 'http://localhost:5000/costs',
    fields: {
        date: {
            text: 'Date',
            sort: true,
            value: (cost) => {
                return new Date(cost.date).toLocaleDateString();
            }
        },
        category: {
            text: 'Category',
            sort: false,
            value: (cost) => {
                return cost.category.name;
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
    options: {
        sort: {
            default: {key: 'date', direction: 'desc'}
        },
        pageSize: 5
    },
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

export default function CostIndex() {
    return (
        <>
            <h1>Costs</h1>
            <Link to="/cost/create" className={style['btn-add']}>Add</Link>
            <Grid
                requestEndpoint={config.requestEndpoint}
                fields={config.fields}
                options={config.options}
                buttons={config.buttons}
            />
        </>
    );
}