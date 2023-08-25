import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import CategoryForm from "../../framework/components/forms/CategoryForm.jsx";

import Category from "../../entities/Category";

export default function CategoryUpdate() {
    const {id} = useParams();
    const [category, setCategory] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        Category.getById(parseInt(id)).then((obj) => {
            setCategory(obj);
        })
    }, []);

    const handelSubmit = (formData) => {
        category.name = formData.name;
        category.save();

        navigate("/category/index");
    }

    return (
        <>
            <h1>Update category #{id}</h1>
            <CategoryForm category={category} onSubmit={handelSubmit}/>
        </>
    );
}