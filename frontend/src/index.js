import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalProvider } from './context/globalContext';
import GlobalStyles from './styles/GlobalStyle'; // Ensure this matches the exported name

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyles /> {/* Use the correct name here */}
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);
