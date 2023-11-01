import React, {useEffect, useState} from "react";

import style from "./Pagination.module.css"

const computeParams = (pageNum, pageSize, totalCount) => {
    const start = (pageNum - 1) * pageSize,
          end = Math.min(start + pageSize, totalCount),
          totalPages = Math.ceil(totalCount / pageSize);

    return {
        start: start,
        end: end,
        totalCount: totalCount,
        totalPages: totalPages
    }
}

export default function Pagination({data, pageNum, pageSize, totalCount, setPageNum}) {
    const [params, setParams] = useState({
        start: 0,
        end: 0,
        totalCount: 0,
        totalPages: 0
    });

    useEffect(() => {
        setParams(computeParams(pageNum, pageSize, totalCount));
    }, [data, pageNum]);

    const handelPrevClick = () => {
        if (pageNum > 1) {
            setPageNum(parseInt(pageNum) - 1);
        }
    }

    const handelNextClick = () => {
        if (pageNum < params.totalPages ) {
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
    for (let i = 0; i < params.totalPages; i++) {
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
                Showing <b>{params.start + 1}</b> to <b>{params.end}</b> of <b>{params.totalCount}</b> results
            </div>
            <div className={style.buttons}>
                <button className={style.button} onClick={handelPrevClick}>Prev</button>
                {buttons}
                <button className={style.button} onClick={handelNextClick}>Next</button>
            </div>
        </div>
    );
}