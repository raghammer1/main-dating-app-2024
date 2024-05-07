import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './authPages/loginPage/LoginPage';

/**
 * Main application component that sets up routing and global providers.
 * Handles the routing for login, registration, dashboard, and presentation management.
 */
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
