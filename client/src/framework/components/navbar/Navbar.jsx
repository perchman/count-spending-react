"use strict"

import React from "react";
import { NavLink, useLocation} from "react-router-dom";

import style from "./Navbar.module.css";

export default function Navbar() {
    const location = useLocation();

    const setActive = (name) => {
        return isEntityActive(name) ? style.active + ' ' + style.link : style.link;
    }

    const isEntityActive = (name) => {
        let entity = location.pathname.split('/')[1] || 'cost';

        return entity === name;
    };

    return (
        <header>
            <nav className={ style.nav }>
                <ol className={ style.inner }>
                    { data.map(item => (
                        <li key={ item.name } className={ style.item }>
                            <NavLink to={ item.path } className={setActive(item.name)}>
                                { item.text }
                            </NavLink>
                        </li>
                    ))}
                </ol>
            </nav>
        </header>
    );
}

const data = [
    {
        name: 'cost',
        text: 'Costs',
        path: ''
    },
    {
        name: 'category',
        text: 'Category',
        path: 'category/index'
    },
    {
        name: 'balance',
        text: 'Balance',
        path: 'balance/index'
    }
]