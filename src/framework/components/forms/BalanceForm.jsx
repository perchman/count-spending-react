import React, {useState} from "react";

import DateField from "./fields/DateField.jsx";
import NumberField from "./fields/NumberField.jsx";
import SubmitButton from "./fields/SubmitButton.jsx";

import style from "./Form.module.css";

export default function BalanceForm({onSubmit}) {
    const [formData, setFormData] = useState({
        date: '',
        replenish: ''
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
                <DateField
                    className={style.input}
                    name='date'
                    value={''}
                    onChange={handleInputChange}
                />
            </div>
            <div className={style.item}>
                <NumberField
                    className={style.input}
                    name='replenish'
                    placeholder='Amount'
                    value={''}
                    onChange={handleInputChange}
                />
            </div>
            <div className={style.item}>
                <SubmitButton
                    className={style.button}
                    text='Add'
                />
            </div>
        </form>
    );
}