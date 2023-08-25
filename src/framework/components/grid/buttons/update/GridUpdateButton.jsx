import React from "react";
import {Link} from "react-router-dom";
import {FaPen} from "react-icons/fa";

import style from "./GridUpdateButton.module.css";

export default function GridUpdateButton(props) {
    return (
        <Link
            to={props.url}
            className={style.btn}
        >
            <FaPen size="18px"/>
        </Link>
    );
}