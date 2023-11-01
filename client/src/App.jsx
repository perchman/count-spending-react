"use strict"

import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./framework/components/Layout.jsx";

import CostIndex from "./view/cost/CostIndex.jsx";
import CostCreate from "./view/cost/CostCreate.jsx";
import CostUpdate from "./view/cost/CostUpdate.jsx";
import CostDelete from "./view/cost/CostDelete.jsx";

import CategoryIndex from "./view/category/CategoryIndex.jsx";
import CategoryCreate from "./view/category/CategoryCreate.jsx";
import CategoryUpdate from "./view/category/CategoryUpdate.jsx";
import CategoryDelete from "./view/category/CategoryDelete.jsx";

import BalanceIndex from "./view/balance/BalanceIndex.jsx";
import BalanceReplenish from "./view/balance/BalanceReplenish.jsx";
import BalanceHistory from "./view/balance/BalanceHistory.jsx";
import HistoryBalanceChangeDelete from "./view/balance/HistoryBalanceChangeDelete.jsx";

import "./framework/components/style.css";

export default function App() {
    return (
        <>
            <Routes>
                <Route path="?" element={ <Layout /> }>
                    <Route index element={ <CostIndex /> }/>
                    <Route path="cost/create" element={ <CostCreate /> }/>
                    <Route path="cost/update/:uuid" element={ <CostUpdate /> }/>
                    <Route path="cost/delete/:uuid" element={ <CostDelete />}/>

                    <Route path="category/index" element={ <CategoryIndex /> }/>
                    <Route path="category/create" element={ <CategoryCreate /> }/>
                    <Route path="category/update/:uuid" element={ <CategoryUpdate /> }/>
                    <Route path="category/delete/:uuid" element={ <CategoryDelete />}/>

                    <Route path="balance/index" element={ <BalanceIndex /> }/>
                    <Route path="balance/replenish" element={ <BalanceReplenish /> }/>
                    <Route path="balance/history" element={ <BalanceHistory /> }/>
                    <Route path="balance/history/delete/:uuid" element={ <HistoryBalanceChangeDelete /> }/>
                </Route>
            </Routes>
        </>
    );
}