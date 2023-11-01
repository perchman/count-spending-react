import React from "react";
import {useNavigate} from "react-router-dom";

import CategoryForm from "../../framework/components/forms/CategoryForm.jsx";

export default function CategoryCreate() {
    const navigate = useNavigate();

    const handelSubmit = async (data) => {
        fetch('http://localhost:5000/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
        })
            .then((res) => {
                if (res.status === 200) {
                    navigate("/category/index");
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <h1>Create category</h1>
            <CategoryForm category={{}} onSubmit={handelSubmit}/>
        </>
    );
}