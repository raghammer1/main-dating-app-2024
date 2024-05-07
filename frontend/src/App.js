import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/**
 * Main application component that sets up routing and global providers.
 * Handles the routing for login, registration, dashboard, and presentation management.
 */
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
