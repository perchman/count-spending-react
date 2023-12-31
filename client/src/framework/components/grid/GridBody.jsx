import React from "react";

import style from "./Grid.module.css";

export default function GridBody({data, fields, buttons}) {
    const rows = [];

    for (let item of data) {

        const cells = [];
        for (let field in fields) {
            cells.push(
                <td
                    key={item.uuid + '-' + field}
                    className={style.cell}
                >
                    {fields[field].value(item)}
                </td>
            );
        }

        rows.push(
            <tr key={item.uuid}>
                {cells}
                <td className={style.cell}>
                    {buttons.map((button) => {
                        return <button.component
                            url={button.createUrl(item.uuid)}
                            key={`${button.key}-${item.uuid}`}
                            id={item.uuid}
                        />
                    })}
                </td>
            </tr>
        );
    }

    return (
        <tbody>
            {rows}
        </tbody>
    );
}