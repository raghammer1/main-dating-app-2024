import Dashboard from './Dashboard';
import DashboardNav from './DashboardNav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Likes from './Likes/Likes';
import Profile from './Profile/Profile';
import Chat from './Chat/Chat';
import { useEffect, useState } from 'react';
import { logout } from '../shared/utils/auth';
import { connectWithSocketServer } from '../realtimeCommunication/SocketConnection';

const DashboardMain = () => {
  // const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // const parsedToken = JSON.parse(storedToken);
      // setToken(parsedToken);
      connectWithSocketServer(storedToken);
      console.log('YAYA');
    } else {
      console.log('HMM');
    }

    // if (!token) {t
    //   logout();
    //   console.log('LOLLL');
    // } else {
    //   try {
    //     const parsedToken = JSON.parse(storedToken);
    //     setToken(parsedToken);
    //     connectWithSocketServer(parsedToken);
    //   } catch (error) {
    //     console.error('Error parsing user details:', error);
    //     logout(); // In case of parsing error
    //     console.log('Error parsing user details:', error);
    //   }
    // }
  }, []);

  // // Conditional rendering based on token
  // if (!token) {
  //   return null; // Or a loading spinner, or a redirect to the login page
  // }

  return (
    <div>
      <DashboardNav />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="find" element={<Dashboard />} />
          <Route path="likes" element={<Likes />} />
          <Route path="chat" element={<Chat />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};
export default DashboardMain;
