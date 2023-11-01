"use strict"

import React, {useEffect, useState} from "react";

import GridHeader from "./GridHeader.jsx";
import GridBody from "./GridBody.jsx";
import Pagination from "../pagunation/Pagination.jsx";

import style from "./Grid.module.css";

export default function Grid({requestEndpoint, fields, options, buttons}) {
    const [sort, setSort] = useState(options.sort.default);
    const [pageNum, setPageNum] = useState(1);

    const [data, setData] = useState({
        items: [],
        totalCount: 0
    });

    useEffect(() => {
        fetch(
            requestEndpoint +
            `?sort=${sort.key}_${sort.direction}` +
            `&page=${pageNum}` +
            `&size=${options.pageSize}`
        )
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then((data) => {
                if (data) {
                    setData(data);
                }
            })
            .catch(err => console.log(err));
    }, [sort, pageNum]);

    return (
        <>
            <table className={style.table}>
                <GridHeader fields={fields} sort={sort} setSort={setSort} />
                <GridBody
                    data={data.items}
                    fields={fields}
                    buttons={buttons}
                />
            </table>
            <Pagination
                data={data}
                pageNum={pageNum}
                pageSize={options.pageSize}
                totalCount={data.totalCount}
                setPageNum={setPageNum}
            />
        </>
    );
}