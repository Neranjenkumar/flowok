import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/v1/income/"; // Updated to match your routes

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    // Token state
    const [token, setToken] = useState('');

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setAuthToken(savedToken);
            console.log('Token retrieved from localStorage:', savedToken); // Debugging line
        }
    }, []);

    // Set the token
    const setAuthToken = (newToken) => {
        setToken(newToken);
        if (newToken) {
            console.log('Setting token:', newToken); // Debugging line
            axios.defaults.headers.common['authorization'] = `Bearer ${newToken}`;
        } else {
            delete axios.defaults.headers.common['authorization'];
        }
    };

    // Login function to handle authentication and token storage
    const login = async (credentials) => {
        try {
            const response = await axios.post(`${BASE_URL}auth/login-user`, credentials); // Check your auth route
            const { token } = response.data;
            console.log('Login successful, received token:', token); // Debugging line
            setAuthToken(token); // Store the token in global state
            localStorage.setItem('token', token); // Optionally store it in local storage
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    // Calculate total income
    const totalIncome = () => {
        return incomes.reduce((total, income) => total + income.amount, 0);
    };

    // Calculate total expenses
    const totalExpenses = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };

    // Calculate total balance
    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    // Get transaction history
    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3);
    };

    // Add income
    const addIncome = async (income) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:5000/api/v1/income/add-income', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(income)
            });
            if (!response.ok) throw new Error('Network response was not ok.');
            const data = await response.json();
            // Handle successful response
        } catch (error) {
            console.error('Error adding income:', error);
            setError(error.message);
        }
    };
    
    // Get incomes
    const getIncomes = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:5000/api/v1/income/get-incomes', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Network response was not ok.');
            const data = await response.json();
            // Handle successful response
        } catch (error) {
            console.error('Error fetching incomes:', error);
            setError(error.message);
        }
    };

    // Delete income
    const deleteIncome = async (id, token) => {
        try {
            const response = await fetch(`${BASE_URL}delete-income/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            setIncomes(prevIncomes => prevIncomes.filter(income => income._id !== id));
        } catch (error) {
            console.error('Error deleting income:', error);
        }
    };

    // Add expense
    const addExpense = async (expense) => {
        console.log('Adding expense with token:', axios.defaults.headers.common['authorization']); // Debugging line
        try {
            await axios.post(`${BASE_URL}add-expense`, expense);
            await getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    // Get expenses
    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`);
            setExpenses(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    // Delete expense
    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`);
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
            login // Export login function
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
