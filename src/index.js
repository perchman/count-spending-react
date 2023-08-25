"use strict"

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import ServiceLocator from "./framework/ServiceLocator";
import DefaultIndexedDB from "./DefaultIndexedDB";

import App from "./App.jsx";

ServiceLocator.set('Default', DefaultIndexedDB.getInstance());

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);