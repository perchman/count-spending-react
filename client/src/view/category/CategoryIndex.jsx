import React from "react";
import {Link} from "react-router-dom";

import Grid from "../../framework/components/grid/Grid.jsx";
import GridDeleteButton from "../../framework/components/grid/buttons/delete/GridDeleteButton.jsx";
import GridUpdateButton from "../../framework/components/grid/buttons/update/GridUpdateButton.jsx";

import style from "../Page.module.css";

const config = {
    requestEndpoint: 'http://localhost:5000/categories',
    fields: {
        name: {
            text: 'Name',
            sort: true,
            value: (category) => {
                return category.name;
            }
        }
    },
    options: {
        sort: {
            default: {key: 'name', direction: 'asc'}
        },
        pageSize: 5
    },
    buttons: [
        {
            key: 'update',
            component: GridUpdateButton,
            createUrl: (id) => {
                return `/category/update/${id}`
            }
        },
        {
            key: 'delete',
            component: GridDeleteButton,
            createUrl: (id) => {
                return `/category/delete/${id}`;
            }
        }
    ]
}

export default function CategoryIndex() {
    return (
        <>
            <h1>Categories</h1>
            <Link to="/category/create" className={style['btn-add']}>Add</Link>
            <Grid
                requestEndpoint={config.requestEndpoint}
                fields={config.fields}
                options={config.options}
                buttons={config.buttons}
            />
        </>
    );
}