import React, {useEffect, useState} from "react";

export default function DropdownField(props) {
    const [data, setData] = useState([]);
    const [selectedOption, setSelectedOption] = useState(props.selected);

    useEffect(() => {
        props.getData().then((data) => {
            setData(data);
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
            // value={selectedOption}
            // onChange={handelSelectChange}
        >
            <option disabled hidden value='selected'>{props.disabledOption}</option>
            {data.map((item) => (
                <option
                    key={item.id}
                    value={item.id}
                >
                    {`#${item.id} - ${item.name}`}
                </option>
            ))}
        </select>
    );
}