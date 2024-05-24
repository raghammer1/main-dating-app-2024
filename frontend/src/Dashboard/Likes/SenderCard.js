import styled from 'styled-components';
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
import { useState } from 'react';

const InviteCard = styled(Card)`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;
  min-width: 500px;
  border-radius: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.01);
  }
`;

const ImagesContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #ffe4e1;
  height: 200px;
`;

const StyledCardMedia = styled(CardMedia)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ArrowButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.direction === 'left' ? 'left: 10px;' : 'right: 10px;')}
  background-color: rgba(255, 255, 255, 0.7);
  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
`;

const ContentBox = styled(Box)`
  padding: 20px;
  background-color: #ffffff;
  text-align: center;
`;

const UserInfo = styled(Box)`
  margin-bottom: 10px;
`;

const HobbiesContainer = styled(Box)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const StyledChip = styled(Chip)`
  margin: 5px;
  background-color: #ff6f61;
  color: #fff;
`;

const ActionButtons = styled(Box)`
  display: flex;
  justify-content: space-around;
  padding: 15px;
  background-color: #ffe4e1;
`;

const StyledButton = styled(Button)`
  background-color: ${(props) =>
    props.color === 'primary' ? '#ff6f61' : '#ffccd5'};
  color: ${(props) => (props.color === 'primary' ? '#fff' : '#ff6f61')};
  &:hover {
    background-color: ${(props) =>
      props.color === 'primary' ? '#ff5c4d' : '#ffb3b3'};
  }
`;

const SenderCard = ({ invite, handleAccept, handleReject }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleNextImage = (id, imagesLength) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [id]: (prev[id] + 1) % imagesLength,
    }));
  };

  const handlePrevImage = (id, imagesLength) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [id]: (prev[id] - 1 + imagesLength) % imagesLength,
    }));
  };

  return (
    <div>
      <InviteCard key={invite._id}>
        <ImagesContainer>
          <ArrowButton
            direction="left"
            onClick={() =>
              handlePrevImage(invite._id, invite.senderId.images.length)
            }
          >
            <ArrowBack />
          </ArrowButton>
          <StyledCardMedia
            component="img"
            image={invite.senderId.images[currentImageIndex[invite._id]]}
            alt={`${invite.senderId.username}'s image`}
          />
          <ArrowButton
            direction="right"
            onClick={() =>
              handleNextImage(invite._id, invite.senderId.images.length)
            }
          >
            <ArrowForward />
          </ArrowButton>
        </ImagesContainer>
        <ContentBox>
          <UserInfo>
            <Typography component="div" variant="h5">
              {invite.senderId.username}, {calculateAge(invite.senderId.dob)}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {invite.senderId.mail}
            </Typography>
          </UserInfo>
          <HobbiesContainer>
            {invite.senderId.hobbies.map((hobby) => (
              <StyledChip key={hobby} label={hobby} />
            ))}
          </HobbiesContainer>
        </ContentBox>
        <ActionButtons>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => handleAccept(invite._id)}
          >
            Accept
          </StyledButton>
          <StyledButton
            variant="contained"
            color="secondary"
            onClick={() => handleReject(invite._id)}
          >
            Reject
          </StyledButton>
        </ActionButtons>
      </InviteCard>
    </div>
  );
};
export default SenderCard;
