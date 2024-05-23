import React, { useState, useEffect } from 'react';
import useCurrentDisplayProfiles from '../zustand/useCurrentDisplayProfiles';
import './Dashboard.css'; // For handling the color changes

const Dashboard = () => {
  const { displayProfiles, popTopProfile } = useCurrentDisplayProfiles();
  const [currentProfile, setCurrentProfile] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('');

  useEffect(() => {
    if (displayProfiles.length > 0) {
      setCurrentProfile(displayProfiles[0]);
    } else {
      setCurrentProfile(null);
    }
    console.log('Current profile', displayProfiles);
  }, [displayProfiles]);

  const handleDecision = (decision) => {
    if (decision === 'tick') {
      setBackgroundColor('green');
    } else {
      setBackgroundColor('red');
    }

    setTimeout(() => {
      popTopProfile();
      setBackgroundColor('');
    }, 500);
  };

  // const formatImageUrl = (url) => {
  //   if (url.includes('drive.google.com')) {
  //     return url.replace(/\/open\?id=/, '/uc?id=');
  //   }
  //   return url;
  // };
  // const formatImageUrl = (url) => {
  //   if (url.includes('drive.google.com')) {
  //     url = url.replace('&export=view', '');
  //     url = url.replace('/open?', '/uc?');
  //     console.log('Formatted URL:', url); // Log the formatted URL
  //     return url;
  //   }
  //   return url;
  // };

  return (
    <div className={`dashboard ${backgroundColor}`}>
      {currentProfile ? (
        <div className="profile">
          <h2>{currentProfile.username}</h2>
          <h4>{currentProfile.mail}</h4>
          <div className="images">
            {currentProfile.images.map((image, index) => {
              const formattedUrl = image;
              console.log('Image URL:', formattedUrl); // Log the URL being used for each image
              return (
                <img
                  key={index}
                  src={formattedUrl}
                  alt={`Profile ${index}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'path/to/default-image.jpg';
                  }}
                />
              );
            })}
          </div>
          <div className="actions">
            <button onClick={() => handleDecision('tick')}>✔️</button>
            <button onClick={() => handleDecision('cross')}>❌</button>
          </div>
        </div>
      ) : (
        <p>No profiles to display</p>
      )}
    </div>
  );
};

export default Dashboard;
