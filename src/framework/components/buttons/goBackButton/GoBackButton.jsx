import React from "react";
import {useNavigate} from "react-router-dom";

import style from "./GoBackButton.module.css";

export default function GoBackButton() {
    const navigate = useNavigate();

    const handelClick = () => navigate(-1);

    return (
        <button
            className={style.btn}
            onClick={handelClick}
        >
            Back
        </button>
    );
}