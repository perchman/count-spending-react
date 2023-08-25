import React from "react";
import {Link} from "react-router-dom";

import Grid from "../../framework/components/grid/Grid.jsx";
import GridDeleteButton from "../../framework/components/grid/buttons/delete/GridDeleteButton.jsx";
import GridUpdateButton from "../../framework/components/grid/buttons/update/GridUpdateButton.jsx";

import style from "../Page.module.css";
import DataProvider from "../../framework/DataProvider";
import Category from "../../entities/Category";

export default function CategoryIndex() {
    return (
        <>
            <h1>Categories</h1>
            <Link to="/category/create" className={style['btn-add']}>Add</Link>
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
            value: (category) => {
                return category.id;
            }
        },
        name: {
            text: 'Name',
            sort: false,
            value: (category) => {
                return category.name;
            }
        }
    },
    dataProvider: new DataProvider({
        model: Category,
        sort: {
            default: {key: 'id', direction: 'desc'}
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