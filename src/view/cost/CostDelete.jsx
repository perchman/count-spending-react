import React, {useEffect, useState} from "react";

import GoBackButton from "../../framework/components/buttons/goBackButton/GoBackButton.jsx";
import {useParams} from "react-router-dom";

import Cost from "../../entities/Cost";

export default function CostDelete() {
    const {id} = useParams();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSuccess, setIsSuccess] = useState({
        title: 'Success!',
        class: 'success',
        text: 'Cost #' + id + ' removed.'
    });

    useEffect(() => {
        Cost.getById(parseInt(id)).then((cost) => {
            cost.delete().catch((error) => {
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