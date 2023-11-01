import React, {useEffect, useState} from "react";

import Form from "./Form.jsx";
import DateField from "./fields/DateField.jsx";
import DropdownField from "./fields/DropdownField.jsx";
import NumberField from "./fields/NumberField.jsx";
import TextField from "./fields/TextField.jsx";

import style from "./Form.module.css";

export default function CostForm({cost, onSubmit}) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData({
            date: cost.date ? new Date(cost.date).toISOString().split('T')[0] : '',
            category: cost.category ? cost.category.uuid : '',
            price: cost.price || '',
            description: cost.description || ''
        });
    }, [cost]);

    // const handelSubmit = (e) => {
    //     e.preventDefault();
    //     onSubmit(formData);
    // }
    //
    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //
    //     setFormData(prevFormData => ({
    //         ...prevFormData,
    //         [name]: value,
    //     }));
    // };

    const getDataForDropdown = async () => {
        return fetch('http://localhost:5000/categories?sort=name_asc')
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                if (data) {
                    return data;
                }
            })
            .catch(err => console.log(err));
    }

    const fields = {
        date: {
            component: DateField,
            params: {
                className: style.input,
                name: 'date',
                value: formData.date,
                validators: ['required']
            }
        },
        category: {
            component: DropdownField,
            params: {
                style: {
                    select: style.input
                },
                name: 'category',
                disabledOption: 'Select a category',
                selected: formData.category || 'selected',
                getData: getDataForDropdown,
                validators: ['required']
            }
        },
        price: {
            component: NumberField,
            params: {
                className: style.input,
                name: 'price',
                placeholder: 'Price',
                value: formData.price,
                validators: ['required', 'positiveNumber']
            }
        },
        description: {
            component: TextField,
            params: {
                className: style.input,
                name: 'description',
                placeholder: 'Description',
                value: formData.description,
                validators: ['required', 'maxLength']
            }
        }
    };

    return (
        <Form id="cost-form" fields={fields} onSubmit={onSubmit}/>
    );
}