import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Create a link element for Google Fonts
const link = document.createElement('link');
link.href = "https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link); // Append the link to the document head

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
