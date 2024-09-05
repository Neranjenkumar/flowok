// import React, { useContext, useState, useEffect, useCallback } from "react";
// import axios from 'axios';

// const BASE_URL = "http://localhost:5000/api/v1/";

// const GlobalContext = React.createContext();

// export const GlobalProvider = ({ children }) => {
//     const [incomes, setIncomes] = useState([]);
//     const [expenses, setExpenses] = useState([]);
//     const [error, setError] = useState(null);
//     const [token, setToken] = useState('');

//     useEffect(() => {
//         const savedToken = localStorage.getItem('token');
//         console.log('Retrieved Token:', savedToken); // Debugging line
//         if (savedToken) {
//             setAuthToken(savedToken);
//         }
//     }, []);

//     const setAuthToken = (newToken) => {
//         setToken(newToken);
//         if (newToken) {
//             axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
//         } else {
//             delete axios.defaults.headers.common['Authorization'];
//         }
//     };

//     const login = async (credentials) => {
//         try {
//             const response = await axios.post(`${BASE_URL}auth/login-user`, credentials);
//             const { token } = response.data;
//             setAuthToken(token);
//             localStorage.setItem('token', token);
//         } catch (err) {
//             setError(err.response?.data?.message || 'An error occurred');
//         }
//     };

//     const totalIncome = () => incomes.reduce((total, income) => total + income.amount, 0);
//     const totalExpenses = () => expenses.reduce((total, expense) => total + expense.amount, 0);
//     const totalBalance = () => totalIncome() - totalExpenses();

//     const transactionHistory = () => {
//         const history = [...incomes, ...expenses];
//         history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         return history.slice(0, 3);
//     };

//     const addIncome = async (income) => {
//         try {
//             const response = await axios.post(`${BASE_URL}income/add-income`, income);
//             setIncomes([...incomes, response.data]);
//         } catch (error) {
//             setError(error.response?.data?.message || 'Failed to add income');
//         }
//     };

// // globalContext.js (or wherever you are making the API call)
// const addExpense = async (formData) => {
//     try {
//         const token = localStorage.getItem('token');
//         console.log('Token being sent:', token);  // Debug log
//         if (!token) {
//             setError('No authentication token found');
//             return;
//         }

//         const response = await fetch(`${BASE_URL}expense/add-expense`, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//             },
//             body: formData,
//         });

//         const result = await response.json();
//         if (response.ok) {
//             console.log('Expense added successfully:', result);
//             setExpenses(prev => [...prev, result.expense]);  // Update the state with the new expense
//         } else {
//             setError(result.message || 'Failed to add expense');
//         }
//     } catch (error) {
//         console.error('Error adding expense:', error);
//         setError('An error occurred while adding the expense');
//     }
// };


//     const getIncomes = useCallback(async () => {
//         try {
//             const response = await axios.get(`${BASE_URL}income/get-incomes`);
//             setIncomes(response.data);
//         } catch (error) {
//             if (error.response && error.response.status === 401) {
//                 const savedToken = localStorage.getItem('token');
//                 if (savedToken) {
//                     setAuthToken(savedToken);
//                     try {
//                         const retryResponse = await axios.get(`${BASE_URL}income/get-incomes`);
//                         setIncomes(retryResponse.data);
//                     } catch (retryError) {
//                         setError(retryError.response?.data?.message || 'Failed to fetch incomes');
//                     }
//                 }
//             } else {
//                 setError(error.response?.data?.message || 'Failed to fetch incomes');
//             }
//         }
//     }, []);

//     const getExpenses = useCallback(async () => {
//         try {
//             const response = await axios.get(`${BASE_URL}expense/get-expenses`);
//             setExpenses(response.data);
//         } catch (error) {
//             if (error.response && error.response.status === 401) {
//                 const savedToken = localStorage.getItem('token');
//                 if (savedToken) {
//                     setAuthToken(savedToken);
//                     try {
//                         const retryResponse = await axios.get(`${BASE_URL}expense/get-expenses`);
//                         setExpenses(retryResponse.data);
//                     } catch (retryError) {
//                         setError(retryError.response?.data?.message || 'Failed to fetch expenses');
//                     }
//                 }
//             } else {
//                 setError(error.response?.data?.message || 'Failed to fetch expenses');
//             }
//         }
//     }, []);

//     return (
//         <GlobalContext.Provider
//             value={{
//                 incomes,
//                 expenses,
//                 error,
//                 login,
//                 totalIncome,
//                 totalExpenses,
//                 totalBalance,
//                 transactionHistory,
//                 addIncome,
//                 addExpense, // Added here
//                 getIncomes,
//                 getExpenses,
//                 setError, // Added here
//             }}
//         >
//             {children}
//         </GlobalContext.Provider>
//     );
// };

// export const useGlobalContext = () => useContext(GlobalContext);


//************************** */
// import React, { useContext, useState, useEffect, useCallback } from "react";
// import axios from 'axios';

// const BASE_URL = "http://localhost:5000/api/v1/";

// const GlobalContext = React.createContext();

// export const GlobalProvider = ({ children }) => {
//     const [incomes, setIncomes] = useState([]);
//     const [expenses, setExpenses] = useState([]);
//     const [error, setError] = useState(null);
//     const [token, setToken] = useState('');

//     useEffect(() => {
//         const savedToken = localStorage.getItem('token');
//         if (savedToken) {
//             setAuthToken(savedToken);
//         }
//     }, []);

//     const setAuthToken = (newToken) => {
//         setToken(newToken);
//         if (newToken) {
//             axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
//         } else {
//             delete axios.defaults.headers.common['Authorization'];
//         }
//     };

//     const login = async (credentials) => {
//         try {
//             const response = await axios.post(`${BASE_URL}auth/login-user`, credentials);
//             const { token } = response.data;
//             setAuthToken(token);
//             localStorage.setItem('token', token);
//         } catch (err) {
//             setError(err.response?.data?.message || 'An error occurred');
//         }
//     };

//     const totalIncome = () => incomes.reduce((total, income) => total + income.amount, 0);
//     const totalExpenses = () => expenses.reduce((total, expense) => total + expense.amount, 0);
//     const totalBalance = () => totalIncome() - totalExpenses();

//     const transactionHistory = () => {
//         const history = [...incomes, ...expenses];
//         history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         return history.slice(0, 3);
//     };

//     const addIncome = async (income) => {
//         try {
//             const response = await axios.post(`${BASE_URL}income/add-income`, income);
//             setIncomes([...incomes, response.data]);
//         } catch (error) {
//             setError(error.response?.data?.message || 'Failed to add income');
//         }
//     };
//     const addExpense = async (formData) => {
//         try {
//             // No need to manually handle the token here since Axios is already configured
//             const response = await axios.post(`${BASE_URL}expense/add-expense`, formData);
    
//             // Handle the successful response
//             setExpenses(prev => [...prev, response.data.expense]);
//         } catch (error) {
//             // Handle errors
//             setError(error.response?.data?.message || 'Failed to add expense');
//         }
//     };
    
//     const deleteIncome = async (id) => {
//         try {
//             await axios.delete(`${BASE_URL}income/delete-income/${id}`);
//             setIncomes(incomes.filter(income => income._id !== id));
//         } catch (error) {
//             setError(error.response?.data?.message || 'Failed to delete income');
//         }
//     };

//     const deleteExpense = async (id) => {
//         try {
//             await axios.delete(`${BASE_URL}expense/delete-expense/${id}`);
//             setExpenses(expenses.filter(expense => expense._id !== id));
//         } catch (error) {
//             setError(error.response?.data?.message || 'Failed to delete expense');
//         }
//     };

//     const getIncomes = useCallback(async () => {
//         try {
//             const response = await axios.get(`${BASE_URL}income/get-incomes`);
//             setIncomes(response.data);
//         } catch (error) {
//             if (error.response && error.response.status === 401) {
//                 const savedToken = localStorage.getItem('token');
//                 if (savedToken) {
//                     setAuthToken(savedToken);
//                     try {
//                         const retryResponse = await axios.get(`${BASE_URL}income/get-incomes`);
//                         setIncomes(retryResponse.data);
//                     } catch (retryError) {
//                         setError(retryError.response?.data?.message || 'Failed to fetch incomes');
//                     }
//                 }
//             } else {
//                 setError(error.response?.data?.message || 'Failed to fetch incomes');
//             }
//         }
//     }, []);

//     const getExpenses = useCallback(async () => {
//         try {
//             const response = await axios.get(`${BASE_URL}expense/get-expenses`);
//             setExpenses(response.data);
//         } catch (error) {
//             if (error.response && error.response.status === 401) {
//                 const savedToken = localStorage.getItem('token');
//                 if (savedToken) {
//                     setAuthToken(savedToken);
//                     try {
//                         const retryResponse = await axios.get(`${BASE_URL}expense/get-expenses`);
//                         setExpenses(retryResponse.data);
//                     } catch (retryError) {
//                         setError(retryError.response?.data?.message || 'Failed to fetch expenses');
//                     }
//                 }
//             } else {
//                 setError(error.response?.data?.message || 'Failed to fetch expenses');
//             }
//         }
//     }, []);

//     return (
//         <GlobalContext.Provider
//             value={{
//                 incomes,
//                 expenses,
//                 error,
//                 login,
//                 totalIncome,
//                 totalExpenses,
//                 totalBalance,
//                 transactionHistory,
//                 addIncome,
//                 addExpense,
//                 deleteIncome,  // Added here
//                 deleteExpense, // Added here
//                 getIncomes,
//                 getExpenses,
//                 setError,
//             }}
//         >
//             {children}
//         </GlobalContext.Provider>
//     );
// };

// export const useGlobalContext = () => useContext(GlobalContext);

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
        }
    }, []);

    const setAuthToken = (newToken) => {
        setToken(newToken);
        if (newToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
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
            setError(error.response?.data?.message || 'Failed to add income');
        }
    };

    const addExpense = async (formData) => {
        try {
            console.log('Sending expense data:', formData);
            const response = await axios.post(`${BASE_URL}expense/add-expense`, formData);
            
            if (response.data && response.data.expense) {
                setExpenses(prevExpenses => [...prevExpenses, response.data.expense]);
                console.log('Added expense:', response.data.expense);
            } else {
                throw new Error('Failed to add expense');
            }
    
            getExpenses(); // Fetch expenses after adding a new one
    
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to add expense');
        }
    };
    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}income/delete-income/${id}`);
            setIncomes(incomes.filter(income => income._id !== id));
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to delete income');
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}expense/delete-expense/${id}`);
            setExpenses(expenses.filter(expense => expense._id !== id));
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to delete expense');
        }
    };

    const getIncomes = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}income/get-incomes`);
            setIncomes(response.data);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch incomes');
        }
    }, []);

    const getExpenses = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}expense/get-expenses`);
            setExpenses(response.data);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch expenses');
        }
    }, []);

    useEffect(() => {
        // Fetch incomes and expenses when the token is set or on component mount
        if (token) {
            getIncomes();
            getExpenses();
        }
    }, [token, getIncomes, getExpenses]);

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
                addExpense,
                deleteIncome,
                deleteExpense,
                getIncomes,
                getExpenses,
                setError,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
