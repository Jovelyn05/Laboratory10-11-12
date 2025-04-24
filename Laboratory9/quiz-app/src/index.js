import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import App from './App'; // Or your main component
import './index.css'; // Assuming you have styles

const container = document.getElementById('root'); // Get the container element

// Create a root
const root = ReactDOM.createRoot(container);

// Initial render: Render your app to the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);