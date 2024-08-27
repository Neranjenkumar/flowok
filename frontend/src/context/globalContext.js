import React, { useContext, useState, useEffect, useCallback } from "react";
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

    const getIncomes = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}income/get-incomes`);
            setIncomes(response.data);
        } catch (error) {
            console.error('Error fetching incomes:', error.response ? error.response.data : error.message);

            if (error.response && error.response.status === 401) {
                // Retry fetching incomes after refreshing the token
                const savedToken = localStorage.getItem('token');
                if (savedToken) {
                    setAuthToken(savedToken);
                    try {
                        const retryResponse = await axios.get(`${BASE_URL}income/get-incomes`);
                        setIncomes(retryResponse.data);
                    } catch (retryError) {
                        console.error('Retry failed:', retryError.response ? retryError.response.data : retryError.message);
                    }
                }
            }
        }
    }, []);

    const getExpenses = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}expense/get-expenses`);
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error.response ? error.response.data : error.message);

            if (error.response && error.response.status === 401) {
                // Retry fetching expenses after refreshing the token
                const savedToken = localStorage.getItem('token');
                if (savedToken) {
                    setAuthToken(savedToken);
                    try {
                        const retryResponse = await axios.get(`${BASE_URL}expense/get-expenses`);
                        setExpenses(retryResponse.data);
                    } catch (retryError) {
                        console.error('Retry failed:', retryError.response ? retryError.response.data : retryError.message);
                    }
                }
            }
        }
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                incomes,
                expenses,
                error,
                login,
                totalIncome,
                totalExpenses,
                totalBalance,
                transactionHistory,
                addIncome,
                getIncomes,
                getExpenses,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
