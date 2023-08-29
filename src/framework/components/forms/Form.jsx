import React, {useState} from "react";

import SubmitButton from "./fields/SubmitButton.jsx";

import ValidatorFactory from "../../validators/ValidatorFactory";

import style from "./Form.module.css";

export default function Form({id, fields, callback}) {
    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //
    //     setFormData(prevFormData => ({
    //         ...prevFormData,
    //         [name]: value,
    //     }));
    // };

    const handlerSubmit = (e) => {
        e.preventDefault();

        const form = document.getElementById(id);
        const formData = new FormData(form);

        let data = {};
        let errors = {};
        const validatorFactory = new ValidatorFactory();

        for (let field in fields) {
            const value = formData.get(field);

            fields[field].validators.forEach((type) => {
                const validator = validatorFactory.factory(type);
                const error = validator.validate(value);

                if (error) {
                    errors[field] = error;
                    return;
                }
                data[field] = value;
            });
        }

        if (Object.keys(errors).length > 0) {
            for (let error in errors) {
                const elem = document.getElementById('error-' + error);
                elem.textContent = errors[error];
                elem.style.display = 'block';
            }
        } else {
            callback(data);
        }
    }

    return (
        <form id={id} className={style.form} onSubmit={handlerSubmit}>
            {
                Object.entries(fields).map(([key, value]) => {
                    return <div className={style.item} key={'field-' + key}>
                        {value.component}
                        <div id={'error-' + key} className={style.error}></div>
                    </div>;
                })
            }
            <div className={style.item}>
                <SubmitButton
                    className={style.button}
                    text='Save'
                />
            </div>
        </form>
    );
}