"use strict"

import React, {useEffect, useState} from "react";

import GridHeader from "./GridHeader.jsx";
import GridBody from "./GridBody.jsx";
import Pagination from "../pagunation/Pagination.jsx";

import style from "./Grid.module.css";

export default function Grid({fields, dataProvider, buttons}) {
    const [sortConfig, setSortConfig] = useState(dataProvider.config.sort.default);
    const [pageNum, setPageNum] = useState(1);

    const [data, setData] = useState([]);
    useEffect(() => {
        dataProvider.getData(pageNum).then((data) => {
            setData(data);
        })
    }, [sortConfig, pageNum]);

    const requestSort = (key) => {
        const direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';

        dataProvider.config.sort.orderBy = { key, direction };
        setSortConfig({ key, direction });
    };


    return (
        <>
            <table className={style.table}>
                <GridHeader fields={fields} requestSort={requestSort} />
                <GridBody
                    data={data}
                    fields={fields}
                    buttons={buttons}
                />
            </table>
            <Pagination dataProvider={dataProvider} pageNum={pageNum} setPageNum={setPageNum}/>
        </>
    );
}