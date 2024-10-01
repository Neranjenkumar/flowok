// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import { useGlobalContext } from '../../context/globalContext';
// import Button from '../Button/Button';
// import { plus } from '../../utils/Icons';

// function Form() {
//     const { addIncome, getIncomes, error, setError, token } = useGlobalContext();

//     const [userId, setUserId] = useState('');
//     const [inputState, setInputState] = useState({
//         title: '',
//         amount: '',
//         date: new Date(), // Initialize with current date
//         category: '',
//         description: '',
//         type: '' // Ensure this matches the expected value for 'type'
//     });

//     useEffect(() => {
//         if (token) {
//             const decodedToken = JSON.parse(atob(token.split('.')[1]));
//             setUserId(decodedToken.id);
//         }
//     }, [token]);

//     const handleInput = name => e => {
//         setInputState({ ...inputState, [name]: e.target.value });
//         setError('');
//     };

//     const handleDateChange = (date) => {
//         setInputState({ ...inputState, date });
//     };

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();

//     //     // Destructure inputState
//     //     const { title, amount, date, category, description, type } = inputState;

//     //     if (!title || !amount || !date || !category || !description || !type) {
//     //         setError('All fields are required');
//     //         return;
//     //     }

//     //     // Format the date to ISO string
//     //     const formattedDate = new Date(date).toISOString();

//     //     const income = {
//     //         title,
//     //         amount,
//     //         date: formattedDate, // Send formatted date
//     //         category,
//     //         description,
//     //         userId, // Ensure userId is included
//     //         type
//     //     };

//     //     try {
//     //         const data = await addIncome(income);
//     //         console.log('Income added successfully:', data);
//     //         // Handle success (e.g., clear form, show success message)
//     //     } catch (error) {
//     //         console.error('Error adding income:', error.message);
//     //     }
//     // };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         const { title, amount, date, category, description, type } = inputState;
    
//         // Default type if not provided
//         const incomeType = type || 'income'; // Set a default value if 'type' is empty
    
//         console.log('Form data before submission:', {
//             title,
//             amount,
//             date,
//             category,
//             description,
//             incomeType // use the updated field
//         });
    
//         if (!title || !amount || !date || !category || !description || !incomeType) {
//             setError('All fields are required');
//             return;
//         }
    
//         const formattedDate = new Date(date); // Convert to Date object
    
//         const income = {
//             title,
//             amount: parseFloat(amount), // Ensure it's a number
//             date: formattedDate,
//             category,
//             description,
//             userId,
//             type: incomeType // use the updated field
//         };
    
//         try {
//             const data = await addIncome(income);
//             console.log('Income added successfully:', data);
//             // Handle success (e.g., clear form, show success message)
//         } catch (error) {
//             console.error('Error adding income:', error.message);
//         }
//     };
    
//     return (
//         <FormStyled onSubmit={handleSubmit}>
//             {error && <p className='error'>{error}</p>}
//             <div className="input-control">
//                 <input
//                     type="text"
//                     value={inputState.title}
//                     name='title'
//                     placeholder="Salary Title"
//                     onChange={handleInput('title')}
//                 />
//             </div>
//             <div className="input-control">
//                 <input
//                     value={inputState.amount}
//                     type="number"
//                     name='amount'
//                     placeholder='Salary Amount'
//                     onChange={handleInput('amount')}
//                 />
//             </div>
//             <div className="input-control">
//                 <DatePicker
//                     id='date'
//                     placeholderText='Enter A Date'
//                     selected={inputState.date}
//                     dateFormat="yyyy/MM/dd"
//                     onChange={handleDateChange}
//                 />
//             </div>
//             <div className="selects input-control">
//                 <select
//                     required
//                     value={inputState.category}
//                     name="category"
//                     id="category"
//                     onChange={handleInput('category')}
//                 >
//                     <option value="" disabled>Select Option</option>
//                     <option value="salary">Salary</option>
//                     <option value="freelancing">Freelancing</option>
//                     <option value="investments">Investments</option>
//                     <option value="stocks">Stocks</option>
//                     <option value="bitcoin">Bitcoin</option>
//                     <option value="bank">Bank Transfer</option>
//                     <option value="youtube">YouTube</option>
//                     <option value="other">Other</option>
//                 </select>
//             </div>
//             <div className="input-control">
//                 <textarea
//                     name="description"
//                     value={inputState.description}
//                     placeholder='Add A Reference'
//                     id="description"
//                     cols="30"
//                     rows="4"
//                     onChange={handleInput('description')}
//                 ></textarea>
//             </div>
//             <div className="submit-btn">
//                 <Button
//                     name={'Add Income'}
//                     icon={plus}
//                     bPad={'.8rem 1.6rem'}
//                     bRad={'30px'}
//                     bg={'var(--color-accent'}
//                     color={'#fff'}
//                 />
//             </div>
//         </FormStyled>
//     );
// }

// const FormStyled = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 2rem;
//   width: 100%;
//   max-width: 100%;
//   padding: 1rem;
//   box-sizing: border-box;

//   input, textarea, select {
//     font-family: inherit;
//     font-size: inherit;
//     outline: none;
//     border: none;
//     padding: .5rem 1rem;
//     border-radius: 5px;
//     border: 2px solid #fff;
//     background: transparent;
//     resize: none;
//     box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//     color: rgb(88, 0, 0);
//     &::placeholder {
//       color: rgba(34, 34, 96, 0.4);
//     }
//   }

//   .input-control {
//     width: 100%;
//   }

//   .selects {
//     display: flex;
//     justify-content: flex-end;
//     select {
//       color: rgba(34, 34, 96, 0.4);
//       &:focus, &:active {
//         color: rgba(34, 34, 96, 1);
//       }
//     }
//   }

//   .submit-btn {
//     display: flex;
//     justify-content: center;
//     button {
//       box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//       &:hover {
//         background: var(--color-green) !important;
//       }
//     }
//   }

//   @media (max-width: 768px) {
//     padding: 0.5rem;
//     gap: 1rem;
//     .submit-btn button {
//       padding: 0.8rem 1rem;
//     }
//   }

//   @media (max-width: 480px) {
//     .submit-btn button {
//       padding: 0.6rem 0.8rem;
//     }
//   }
// `;
// export default Form;
