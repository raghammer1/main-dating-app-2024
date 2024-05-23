import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './authPages/loginPage/LoginPage';
import RegisterPage from './authPages/RegisterPage/RegisterPage';
import AboutUser from './authPages/RegisterPage/aboutTheUserRegistration/AboutUser';
import { AlertProvider } from './shared/components/AlertNotification';
import { LoadingProvider } from './shared/components/useLoading';
import DashboardMain from './Dashboard/DashboardMain';

/**
 * Main application component that sets up routing and global providers.
 * Hdgfngdfhjtandles the routing for login, registration, dashboard, and presentation management.
 */
const App = () => {
  return (
    <div>
      <LoadingProvider>
        <AlertProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/userInfo/:username" element={<AboutUser />} />
              <Route path="/dashboard/*" element={<DashboardMain />} />
              {/* <Route path="/dashboard/likes" element={<DashboardMain />} />
              <Route path="/dashboard/chat" element={<DashboardMain />} />
              <Route path="/dashboard/profile" element={<DashboardMain />} /> */}
            </Routes>
          </BrowserRouter>
        </AlertProvider>
      </LoadingProvider>
    </div>
  );
};

export default App;
