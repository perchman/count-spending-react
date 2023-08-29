import React from "react";
import {useNavigate} from "react-router-dom";

import CategoryForm from "../../framework/components/forms/CategoryForm.jsx";

import Category from "../../entities/Category";

export default function CategoryCreate() {
    const navigate = useNavigate();

    const handelSubmit = (data) => {
        Category.create(data.name);
        navigate("/category/index");
    }

    return (
        <>
            <h1>Create category</h1>
            <CategoryForm onSubmit={handelSubmit}/>
        </>
    );
}