import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { TRANSACTIONS } from "./data/transactions";
import AddTransaction from "./Components/AddTransaction";
import Transactions from "./Components/Transactions";
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([...TRANSACTIONS]);

  const handleAdd = (newTr) => {
    setTransactions((prev) => [...prev, newTr]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div style={{padding: "20 px"}}>
            <p>Добро пожаловать в самый крутой калькулятор бюджеты в мире!</p>
            <Link to={"/transactions"}>Посмотреть транзакции</Link>
          </div>
        } />
        <Route path="/Transactions" element={<Transactions transactions={transactions}/>} />
        <Route path="/AddTransaction" element={<AddTransaction onAdd={handleAdd}/>} />
      </Routes>
    </Router>
  );
};

export default App;
