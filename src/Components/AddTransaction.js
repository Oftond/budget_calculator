import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TRANSACTIONS } from "../data/transactions";
const AddTransaction = ({ onAdd }) => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        type: "Доход",
        category: "Зарплата",
        amount: 50000,
        date: new Date().toString()
    });

    const handleInputChange = (e) => {
        const { name, value} = e.target;

        setData(field => ({...field, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newTransaction = {
            id: Date.now(),
            ...data,
            amount: data.amount
        };

        onAdd(newTransaction);
        TRANSACTIONS.push(data);
        navigate("/transactions")
    };

    return (
        <div>
            <div>
                <h2>Добавить операцию</h2>
                <button onClick={() => navigate('/transactions')}>Назад</button>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Тип операции</label>
                    <select value={data.type} onChange={handleInputChange}>
                        <option value="Расход">Расход</option>
                        <option value="Доход">Доход</option>
                    </select>
                </div>

                <div>
                    <label>Категория</label>
                    <input type="text" name="category" value={data.category} onChange={handleInputChange} placeholder="Введите категорию" required/>
                </div>

                <div>
                    <label>Сумма</label>
                    <input type="number" name="amount" value={data.amount} onChange={handleInputChange} placeholder="Введите сумму" required/>
                </div>

                <div>
                    <label htmlFor="date">Дата</label>
                    <input type="date" name="date" value={data.date} onChange={handleInputChange} required/>
                </div>

                <div>
                    <button type="button" onClick={() => navigate('/Transactions')}>
                        Отмена
                    </button>
                    <button type="submit">
                        Добавить операцию
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTransaction;
