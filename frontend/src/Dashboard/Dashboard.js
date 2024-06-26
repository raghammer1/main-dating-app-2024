import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import useCurrentDisplayProfiles from '../zustand/useCurrentDisplayProfiles';
import './Dashboard.css'; // For handling the color changes
import { sendInvitationRequestAPI } from '../services/api';
import useUserStore from '../zustand/useUserStore';

const Dashboard = () => {
  const { displayProfiles, popTopProfile } = useCurrentDisplayProfiles();
  const [currentProfile, setCurrentProfile] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('');
  const { getCurrentUser } = useUserStore();

  useEffect(() => {
    if (displayProfiles.length > 0) {
      setCurrentProfile(displayProfiles[0]);
      setCurrentImageIndex(0);
    } else {
      setCurrentProfile(null);
    }
    console.log('Current profile', displayProfiles);
  }, [displayProfiles]);

  const handleDecision = async (decision) => {
    if (decision === 'tick') {
      setBackgroundColor('green');

      const user = await getCurrentUser();
      sendInvitationRequestAPI({
        senderId: user._id,
        receiverId: currentProfile._id,
      });
    } else {
      setBackgroundColor('red');
    }

    setTimeout(() => {
      popTopProfile();
      setBackgroundColor('');
    }, 500);
  };

  const handleImageChange = (direction) => {
    setCurrentImageIndex((prevIndex) => {
      const totalImages = currentProfile.images.length;
      if (direction === 'next') {
        return (prevIndex + 1) % totalImages;
      } else if (direction === 'prev') {
        return (prevIndex - 1 + totalImages) % totalImages;
      }
    });
  };

  return (
    <div className={`dashboard ${backgroundColor}`}>
      {currentProfile ? (
        <Card
          className="profile-card"
          sx={{ maxWidth: 345, margin: '0 auto', mt: 5, borderRadius: '16px' }}
        >
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="200"
              image={
                currentProfile.images[currentImageIndex] ||
                'path/to/default-image.jpg'
              }
              alt="Profile image"
              sx={{ borderRadius: '16px 16px 0 0' }}
            />
            <IconButton
              sx={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
              }}
              onClick={() => handleImageChange('prev')}
            >
              <ArrowBack />
            </IconButton>
            <IconButton
              sx={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)',
              }}
              onClick={() => handleImageChange('next')}
            >
              <ArrowForward />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            {currentProfile.images.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor:
                    index === currentImageIndex ? 'primary.main' : 'grey.400',
                  mx: 0.5,
                }}
              />
            ))}
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {currentProfile.username},{' '}
              {new Date().getFullYear() -
                new Date(currentProfile.dob).getFullYear()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentProfile.mail}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentProfile.gender}, Interested in{' '}
              {currentProfile.genderInterest}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Looking for: {currentProfile.relationIntent}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sexual Orientation: {currentProfile.sexOrientation}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Location: {currentProfile.location.coordinates.join(', ')}
            </Typography>
            <Box sx={{ mt: 2 }}>
              {currentProfile.hobbies.map((hobby, index) => (
                <Chip key={index} label={hobby} sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>
            <div
              className="actions"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '10px',
              }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={() => handleDecision('tick')}
              >
                ✔️
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDecision('cross')}
              >
                ❌
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" component="p" align="center">
          No profiles to display
        </Typography>
      )}
    </div>
  );
};

export default Dashboard;
