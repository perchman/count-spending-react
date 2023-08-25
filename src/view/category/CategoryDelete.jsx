import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import GoBackButton from "../../framework/components/buttons/goBackButton/GoBackButton.jsx";

import Category from "../../entities/Category";

export default function CategoryDelete() {
    const {id} = useParams();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSuccess, setIsSuccess] = useState({
        title: 'Success!',
        class: 'success',
        text: 'Category #' + id + ' removed.'
    });

    useEffect(() => {
            Category.getById(parseInt(id)).then((category) => {
                category.delete().catch((error) => {
                        setIsSuccess({
                            title: 'Error!',
                            class: 'danger',
                            text: error.message
                        });
                    });
                setIsDeleting(true);
            })
    }, []);

    if (!isDeleting) {
        return (
            <>
                <h1>Deleting...</h1>
            </>
        );
    } else {
        return (
            <>
                <h1>{isSuccess.title}</h1>
                <div>{isSuccess.text}</div>
                <GoBackButton />
            </>
        );
    }
}