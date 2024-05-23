import Dashboard from './Dashboard';
import DashboardNav from './DashboardNav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Likes from './Likes/Likes';
import Profile from './Profile/Profile';
import Chat from './Chat/Chat';

const DashboardMain = () => {
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
