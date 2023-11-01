import React, {useState} from "react";

import SubmitButton from "./fields/SubmitButton.jsx";

import ValidatorFactory from "../../validators/ValidatorFactory";

import style from "./Form.module.css";

export default function Form({id, fields, onSubmit}) {
    const [responseError, setResponseError] = useState('');

    const handlerSubmit = (e) => {
        e.preventDefault();

        const form = document.getElementById(id);
        const formData = new FormData(form);

        let data = {};
        let fieldErrors = {};
        const validatorFactory = new ValidatorFactory();

        for (let field in fields) {
            const value = formData.get(field);
            fields[field].params.validators.forEach((type) => {
                const validator = validatorFactory.factory(type);
                const fieldError = validator.validate(value);

                if (fieldError) {
                    fieldErrors[field] = fieldError;
                    return;
                }
                data[field] = value;
            });
        }

        if (Object.keys(fieldErrors).length > 0) {
            for (let fieldError in fieldErrors) {
                const elem = document.getElementById('error-' + fieldError);
                elem.textContent = fieldErrors[fieldError];
                elem.style.display = 'block';
            }
        } else {
            onSubmit(data, setResponseError);
        }
    }

    return (
        <form id={id} className={style.form} onSubmit={handlerSubmit}>
            <div className={style.error}>{responseError}</div>
            {
                Object.values(fields).map((item, index) => {
                    return <div className={style.item} key={'field-' + index}>
                        <item.component {...item.params}/>
                        <div id={'error-' + item.params.name} className={style.error}></div>
                    </div>
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