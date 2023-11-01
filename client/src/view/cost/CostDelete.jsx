import React, {useEffect, useState} from "react";

import GoBackButton from "../../framework/components/buttons/goBackButton/GoBackButton.jsx";
import {useParams} from "react-router-dom";

export default function CostDelete() {
    const {uuid} = useParams();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSuccess, setIsSuccess] = useState({
        title: 'Success!',
        class: 'success',
        text: 'Cost removed.'
    });

    useEffect(() => {
            fetch(`http://localhost:5000/costs?uuid=${uuid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then((res) => {
                    if (res.status === 200 || res.status === 500) {
                        return res.json();
                    }
                })
                .then((data) => {
                    if (data) {
                        if (data.err) {
                            setIsSuccess({
                                title: 'Error!',
                                class: 'danger',
                                text: data.err
                            });
                        }
                    }

                    setIsDeleting(true);
                })
                .catch(err => console.log(err))
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