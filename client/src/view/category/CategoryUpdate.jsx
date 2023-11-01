import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import CategoryForm from "../../framework/components/forms/CategoryForm.jsx";

export default function CategoryUpdate() {
    const {uuid} = useParams();
    const [category, setCategory] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/categories?uuid=${uuid}`)
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then((data) => {
                if (data) {
                    setCategory(data);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handelSubmit = (data) => {
        fetch(`http://localhost:5000/categories?uuid=${uuid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
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
            <h1>Update category</h1>
            <CategoryForm category={category} onSubmit={handelSubmit}/>
        </>
    );
}