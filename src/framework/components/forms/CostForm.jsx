import React, {useEffect, useState} from "react";

import Form from "./Form.jsx";
import DateField from "./fields/DateField.jsx";
import DropdownField from "./fields/DropdownField.jsx";
import NumberField from "./fields/NumberField.jsx";
import TextField from "./fields/TextField.jsx";

import style from "./Form.module.css";
import Category from "../../../entities/Category";

export default function CostForm({cost, onSubmit}) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData({
            date: cost.date ? cost.date.toISOString().split('T')[0] : '',
            category: cost.category ? cost.category.id : '',
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

    const getDataForDropdown =  async () => {
        return await Category.getAll('id desc');
    }

    const fields = {
        date: {
            component: <DateField
                className={style.input}
                name='date'
                value={formData.date}
            />,
            validators: ['required']
        },
        category: {
            component: <DropdownField
                style={{
                    select: style.input
                }}
                name='category'
                disabledOption='Select a category'
                selected={formData.category || 'selected'}
                getData={getDataForDropdown}
            />,
            validators: ['required']
        },
        price: {
            component: <NumberField
                className={style.input}
                name='price'
                placeholder='Price'
                value={formData.price}
            />,
            validators: ['required', 'positiveNumber']
        },
        description: {
            component: <TextField
                className={style.input}
                name='description'
                placeholder='Description'
                value={formData.description}
            />,
            validators: ['required', 'maxLength']
        }
    };

    return (
        <Form id="cost-form" fields={fields} callback={onSubmit}/>
        // <form className={style.form} onSubmit={handelSubmit}>
        //     <div className={style.item}>
        //         <DateField
        //             className={style.input}
        //             name='date'
        //             value={formData.date}
        //             onChange={handleInputChange}
        //         />
        //     </div>
        //     <div className={style.item}>
        //         <DropdownField
        //             style={{
        //                 select: style.input
        //             }}
        //             name='category'
        //             disabledOption='Select a category'
        //             selected={formData.category || 'selected'}
        //             getData={getDataForDropdown}
        //             onChange={handleInputChange}
        //         />
        //     </div>
        //     <div className={style.item}>
        //         <NumberField
        //             className={style.input}
        //             name='price'
        //             placeholder='Price'
        //             value={formData.price}
        //             onChange={handleInputChange}
        //         />
        //     </div>
        //     <div className={style.item}>
        //         <TextField
        //             className={style.input}
        //             name='description'
        //             placeholder='Description'
        //             value={formData.description}
        //             onChange={handleInputChange}
        //         />
        //     </div>
        //     <div className={style.item}>
        //         <SubmitButton
        //             className={style.button}
        //             text='Save'
        //         />
        //     </div>
        // </form>
    );
}