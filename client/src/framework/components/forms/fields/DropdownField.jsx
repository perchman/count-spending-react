import React, {useEffect, useState} from "react";

export default function DropdownField(props) {
    const [data, setData] = useState([]);
    const [selectedOption, setSelectedOption] = useState(props.selected);

    useEffect(() => {
        props.getData().then((data) => {
            setData(data);
            setSelectedOption(props.selected);
        });
    }, []);

    // const handelSelectChange = (e) => {
    //     setSelectedOption(e.target.value);
    //     props.onChange(e);
    // }

    return (
        <select
            className={props.style.select}
            name={props.name}
            defaultValue={selectedOption}
        >
            <option disabled hidden value='selected'>{props.disabledOption}</option>
            {data.map((item) => (
                <option
                    key={item.uuid}
                    value={item.uuid}
                >
                    {item.name}
                </option>
            ))}
        </select>
    );
}