// GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #f9fafb;
    color: #374151;
    line-height: 1.5;
    overflow-x: hidden;
  }

  @media (max-width: 768px) {
    body {
      font-size: 0.875rem; /* Adjust font size for tablets */
    }
  }

  @media (max-width: 480px) {
    body {
      font-size: 0.75rem; /* Adjust font size for mobile */
    }
  }

  .container {
    width: 100%;
    max-width: 100%; /* Ensure fluid width on mobile */
    margin: 0 auto;
    padding: 0 1rem; /* Consistent horizontal padding */
  }

  input, textarea, select {
    width: 100%;
    padding: 0.75rem 1rem;
    margin-bottom: 1rem;
    border-radius: 8px;
    border: 2px solid #ddd;
    background: #fff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: #374151;
    font-size: 1rem;
  }

  .date-picker {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: #374151;
    font-size: 1rem;
  }

  button {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    background-color: #4f46e5;
    color: #fff;
    cursor: pointer;
    border: none;
    font-size: 1rem;
  }

  button.delete {
    background-color: #e11d48; /* Red color for delete button */
  }

  @media (max-width: 480px) {
    input, textarea, select, .date-picker {
      padding: 0.5rem 0.8rem; /* Adjust padding for smaller devices */
      font-size: 0.85rem;
    }

    button {
      font-size: 0.875rem; /* Smaller font size for buttons */
    }
  }

  .error {
    color: red;
    text-align: center;
    margin-bottom: 1rem;
  }
`;

export default GlobalStyles;
