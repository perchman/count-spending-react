import React from "react";
import {Link} from "react-router-dom";
import {AiFillDelete} from "react-icons/ai";

import style from './GridDeleteButton.module.css';

export default function GridDeleteButton(props) {
    return (
        <Link
            to={props.url}
            className={style.btn}
        >
            <AiFillDelete size="18px" pointerEvents="none"/>
        </Link>
    );
}