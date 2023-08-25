import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import CostForm from "../../framework/components/forms/CostForm.jsx";

import Cost from "../../entities/Cost";
import Category from "../../entities/Category";

export default function CostUpdate() {
    const {id} = useParams();
    const [cost, setCost] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        Cost.getById(parseInt(id)).then((obj) => {
            setCost(obj);
        })
    }, []);

    const handelSubmit = async (formData) => {
        cost.date = new Date(formData.date);
        cost.category = await Category.getById(
            parseInt(formData.category)
        );
        cost.price = parseInt(formData.price);
        cost.description = formData.description;

        cost.save();

        navigate("/");
    }

    return (
        <>
            <h1>Update cost #{id}</h1>
            <CostForm cost={cost} onSubmit={handelSubmit}/>
        </>
    );
}