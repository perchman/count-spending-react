import React, {useEffect, useState} from "react";

import GoBackButton from "../../framework/components/buttons/goBackButton/GoBackButton.jsx";
import {useParams} from "react-router-dom";

export default function HistoryBalanceChangeDelete() {
    const {id} = useParams();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSuccess, setIsSuccess] = useState({
        title: 'Success!',
        class: 'success',
        text: 'History balance change #' + id + ' removed.'
    });

    useEffect(() => {

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