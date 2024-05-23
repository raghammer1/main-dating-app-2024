import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './DashboardNav.css';

const DashboardNav = () => {
  const nav = useNavigate();

  const handleGoToFind = () => {
    nav('/dashboard');
  };

  const handleGoToLikes = () => {
    nav('/dashboard/likes');
  };

  const handleGoToChat = () => {
    nav('/dashboard/chat');
  };

  const handleGoToProfile = () => {
    nav('/dashboard/profile');
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#FF6F61' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Button onClick={handleGoToFind} color="inherit">
          FIND
        </Button>
        <Button onClick={handleGoToLikes} color="inherit">
          LIKES
        </Button>
        <Button onClick={handleGoToChat} color="inherit">
          CHAT
        </Button>
        <Button onClick={handleGoToProfile} color="inherit">
          PROFILE
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNav;
