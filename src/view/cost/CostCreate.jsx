import React from "react";
import {useNavigate} from "react-router-dom";

import CostForm from "../../framework/components/forms/CostForm.jsx";

import Cost from "../../entities/Cost";
import Category from "../../entities/Category";

export default function CostCreate() {
    const navigate = useNavigate();

    const handelSubmit = async (formData) => {
        Cost.create(
            new Date(formData.date),
            parseInt(formData.price),
            formData.description,
            await Category.getById(
                parseInt(formData.category)
            )
        );

        navigate("/");
    }

    return (
        <>
            <h1>Create cost</h1>
            <CostForm cost={{}} onSubmit={handelSubmit}/>
        </>
    );
}