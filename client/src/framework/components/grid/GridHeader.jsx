import React from "react";
import style from "./Grid.module.css";

export default function GridHeader({fields, sort, setSort}) {
    const elems = [];

    const requestSort = (key) => {
        const direction = sort.direction === 'asc' ? 'desc' : 'asc';

        setSort({ key, direction });
    };

    for (let header in fields) {
        let content;

        if (fields[header].sort) {
            content =
            <button
                type="button"
                className={style['btn-sort']}
                onClick={() => requestSort(header)}
            >
                {fields[header].text}
            </button>
        } else {
            content = fields[header].text;
        }

        elems.push(<th key={header} className={style.col}>{content}</th>);
    }

    return (
        <thead>
            <tr>
                {elems}
                <th className={style['col-btn']}></th>
            </tr>
        </thead>
    );
}