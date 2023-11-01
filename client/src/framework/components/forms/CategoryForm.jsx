import React, {useEffect, useState} from "react";

import TextField from "./fields/TextField.jsx";
import Form from "./Form.jsx";

import style from "./Form.module.css";

export default function CategoryForm({category, onSubmit}) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData({
            name: category.name || ''
        });
    }, [category]);

    const fields = {
        name: {
            component: TextField,
            params: {
                className: style.input,
                name: 'name',
                placeholder: 'Category name',
                value: formData.name || '',
                validators: ['required', 'maxLength']
            }
        }
    }


    return (
        <Form id="category-form" fields={fields} onSubmit={onSubmit}/>
    );
}

