import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useUserStore from '../../zustand/useUserStore';
import { Box } from '@mui/material';
import SenderCard from './SenderCard';
import { useAlert } from '../../shared/components/AlertNotification';
import {
  acceptFriendInvitationAPI,
  rejectFriendInvitationAPI,
} from '../../services/api';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fbe8e7;
  min-height: 100vh;
`;

const Likes = () => {
  const getPendingFriendInvites = useUserStore(
    (state) => state.getPendingFriendInvites
  );
  const pendingFriendInvites = useUserStore((state) => state.friendInvitations);

  const [pendingInvitations, setPendingInvitations] = useState([]);

  const { showAlert } = useAlert();

  const { getCurrentUser } = useUserStore();

  useEffect(() => {
    const fetchPendingInvitations = async () => {
      const invites = await getPendingFriendInvites();
      setPendingInvitations(invites);
    };
    fetchPendingInvitations();
    showAlert('New Like Received', 'green');
  }, [pendingFriendInvites]);

  const handleAccept = async (inviteId) => {
    // Handle accept invite
    acceptFriendInvitationAPI({ inviteId });
  };

  const handleReject = async (inviteId) => {
    // Handle reject invite
    const user = await getCurrentUser();
    rejectFriendInvitationAPI({ inviteId, userId: user._id });
  };

  if (pendingInvitations.length <= 0) {
    return <div>You are not liked by anyone 😂</div>;
  }

  return (
    <Container>
      {pendingInvitations.map((invite) => (
        <SenderCard
          invite={invite}
          handleAccept={handleAccept}
          handleReject={handleReject}
        />
      ))}
    </Container>
  );
};

export default Likes;
