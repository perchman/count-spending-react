import React, {useEffect, useState} from "react";

import style from "./Pagination.module.css"

export default function Pagination({dataProvider, pageNum, setPageNum}) {
    const [limit, setLimit] = useState({
        start: 0,
        end: 0,
        count: 0,
        totalPages: 0
    });

    useEffect(() => {
        dataProvider.computePageParams(pageNum).then((obj) => {
            setLimit(obj);
        })
    }, [pageNum]);

    const handelPrevClick = () => {
        if (pageNum > 1) {
            setPageNum(parseInt(pageNum) - 1);
        }
    }

    const handelNextClick = () => {
        if (pageNum < limit.totalPages ) {
            setPageNum(parseInt(pageNum) + 1);
        }
    }

    const handelClick = (e) => {
        setPageNum(
            parseInt(
                e.target.getAttribute('data-page')
            )
        );
    }

    const buttons = [];
    for (let i = 0; i < limit.totalPages; i++) {
        const isActive = pageNum === i + 1;

        buttons.push(
            <button
                key={'btn-pagination-' + i}
                className={isActive ? `${style.button} ${style.active}` : style.button}
                onClick={handelClick}
                data-page={i + 1}
            >
                {i + 1}
            </button>
        )
    }

    return (
        <div className={style.pagination}>
            <div className={style.info}>
                Showing <b>{limit.start + 1}</b> to <b>{limit.end}</b> of <b>{limit.count}</b> results
            </div>
            <div className={style.buttons}>
                <button className={style.button} onClick={handelPrevClick}>Prev</button>
                {buttons}
                <button className={style.button} onClick={handelNextClick}>Next</button>
            </div>
        </div>
    );
}