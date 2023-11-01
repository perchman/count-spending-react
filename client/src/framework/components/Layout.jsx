"use strict"

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar.jsx";

import "./style.css";

export default function Layout() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className="container">
                <Outlet />
            </main>
        </>
    );
}