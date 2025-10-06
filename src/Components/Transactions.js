import React, { useState, useEffect } from 'react';
import { TRANSACTIONS } from "../data/transactions";
import { Link } from "react-router-dom";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [filter, setFilter] = useState('Все');
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        setTransactions(TRANSACTIONS);
        calculateBalance(TRANSACTIONS);
    }, []);

    const calculateBalance = (transactions) => {
        const totalIncome = transactions.filter(t => t.type === 'Доход').reduce((sum, t) => sum + t.amount, 0);
        const totalExpense = transactions.filter(t => t.type === 'Расход').reduce((sum, t) => sum + t.amount, 0);
    
        setBalance(totalIncome - totalExpense);
    }

    const filterTransactions = transactions.filter(transaction => {
        if (filter === 'Все') return true;
        return transaction.type === filter;
    });

    return (
        <div className="transactions-page">
        <div className="balance-section">
            <h2>Текущий баланс: {balance}</h2>
        </div>

        <div>
            <div>
            <label>Фильтр по типу:</label>
            <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="filter-select"
            >
                <option value="Все">Все транзакции</option>
                <option value="Доход">Доходы</option>
                <option value="Расход">Расходы</option>
            </select>
            </div>
            
            <Link to="/AddTransaction" className="add-button">Добавить транзакцию</Link>
        </div>

        <div className="transactions-list">
            <h3>Список транзакций</h3>
            {filterTransactions.length === 0 ? (
            <p>Нет транзакций для отображения</p>
            ) : (
            <div>
                <div>
                <span>Дата</span>
                <span>Категория</span>
                <span>Тип</span>
                <span>Сумма</span>
                </div>
                {filterTransactions.map(transaction => (
                <div>
                    <span>{transaction.date}</span>
                    <span>{transaction.category}</span>
                    <span>{transaction.type}</span>
                    <span>{transaction.amount}</span>
                </div>
                ))}
            </div>
            )}
        </div>

        <div>
            <div>
                <span>Всего доходов:</span>
                <span>
                    {transactions.filter(t => t.type === 'Доход').reduce((sum, t) => sum + t.amount, 0)}
                </span>
            </div>
            <div>
                <span>Всего расходов:</span>
                <span>
                    {transactions.filter(t => t.type === 'Расход').reduce((sum, t) => sum + t.amount, 0)}
                </span>
            </div>
        </div>
        </div>
    );
}

export default Transactions;