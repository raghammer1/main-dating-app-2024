import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useUserStore from '../../zustand/useUserStore';
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

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fbe8e7;
  min-height: 100vh;
`;

const InviteCard = styled(Card)`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;
  border-radius: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
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

const Likes = () => {
  const getPendingFriendInvites = useUserStore(
    (state) => state.getPendingFriendInvites
  );
  const pendingFriendInvites = useUserStore((state) => state.friendInvitations);

  const [pendingInvitations, setPendingInvitations] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  useEffect(() => {
    const fetchPendingInvitations = async () => {
      const invites = await getPendingFriendInvites();
      setPendingInvitations(invites);
      setCurrentImageIndex(
        invites.reduce((acc, invite) => {
          acc[invite._id] = 0;
          return acc;
        }, {})
      );
    };
    fetchPendingInvitations();
  }, [pendingFriendInvites]);

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

  const handleAccept = async (inviteId) => {
    // Handle accept invite
  };

  const handleReject = async (inviteId) => {
    // Handle reject invite
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <Container>
      {pendingInvitations.map((invite) => (
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
      ))}
    </Container>
  );
};

export default Likes;
