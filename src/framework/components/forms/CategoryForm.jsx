import React, {useState} from "react";

import TextField from "./fields/TextField.jsx";
import SubmitButton from "./fields/SubmitButton.jsx";

import style from "./Form.module.css";

export default function CategoryForm({category, onSubmit}) {
    category = category || {};

    const [formData, setFormData] = useState({
        name: ''
    });

    const handelSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <form className={style.form} onSubmit={handelSubmit}>
            <div className={style.item}>
                <TextField
                    className={style.input}
                    name='name'
                    placeholder='Category name'
                    value={category.name || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div className={style.item}>
                <SubmitButton
                    className={style.button}
                    text='Save'
                />
            </div>
        </form>
    );
}

