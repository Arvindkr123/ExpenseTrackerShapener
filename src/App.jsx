import React from "react";
import { Route, Routes } from "react-router-dom";
import { Auth, ExpenseTracker } from "./pages";

export default function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Auth />} />
      <Route path="/expense-tracker" exact element={<ExpenseTracker />} />
    </Routes>
  );
}
