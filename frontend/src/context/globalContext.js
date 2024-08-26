import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
    const [token, setToken] = useState('');

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setAuthToken(savedToken);
            console.log('Token retrieved from localStorage:', savedToken);
        } else {
            console.warn('No token found in localStorage.');
        }
    }, []);

    const setAuthToken = (newToken) => {
        setToken(newToken);
        if (newToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            console.log('Authorization header set:', `Bearer ${newToken}`);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            console.warn('Authorization header removed.');
        }
    };

    const login = async (credentials) => {
        try {
            const response = await axios.post(`${BASE_URL}auth/login-user`, credentials);
            const { token } = response.data;
            setAuthToken(token);
            localStorage.setItem('token', token);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    const totalIncome = () => incomes.reduce((total, income) => total + income.amount, 0);
    const totalExpenses = () => expenses.reduce((total, expense) => total + expense.amount, 0);
    const totalBalance = () => totalIncome() - totalExpenses();

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3);
    };

    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${BASE_URL}income/add-income`, income);
            setIncomes([...incomes, response.data]);
        } catch (error) {
            console.error('Error adding income:', error.response ? error.response.data : error.message);
            throw error;
        }
    };
    const getIncomes = async () => {
        try {
            console.log('Making GET request to fetch incomes...');
            console.log('Token being sent:', token);
            console.log('Authorization header:', axios.defaults.headers.common['Authorization']);
            const response = await axios.get(`${BASE_URL}income/get-incomes`);
            console.log('Received incomes:', response.data);
            setIncomes(response.data);
        } catch (error) {
            console.error('Error fetching incomes:', error);
            setError(error.message);
        }
    };
    
    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}income/delete-income/${id}`);
            setIncomes(prevIncomes => prevIncomes.filter(income => income._id !== id));
        } catch (error) {
            console.error('Error deleting income:', error);
        }
    };

    const addExpense = async (expense) => {
        try {
            await axios.post(`${BASE_URL}expense/add-expense`, expense);
            await getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}expense/get-expenses`);
            setExpenses(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}expense/delete-expense/${id}`);
            await getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
            token,
            setAuthToken,
            login
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
