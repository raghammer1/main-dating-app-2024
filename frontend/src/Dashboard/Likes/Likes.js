import { useEffect, useState } from 'react';
import useUserStore from '../../zustand/useUserStore';
import { getPendingFriendInvitesAPI } from '../../services/api';

const Likes = () => {
  const getPendingFriendInvites = useUserStore(
    (state) => state.getPendingFriendInvites
  );
  const pendingFriendInvites = useUserStore((state) => state.friendInvitations);
  // const currentUserDets = useUserStore((state) => state.getCurrentUser);

  const [pendingInvitations, setPendingInvitations] = useState(
    getPendingFriendInvites()
  );

  useEffect(() => {
    setPendingInvitations(getPendingFriendInvites());
  }, [pendingFriendInvites]);

  return (
    <div>
      {pendingInvitations.length > 0 ? (
        <ul>
          {pendingInvitations.map((invite, index) => (
            <li key={index}>
              {index + 1} ({invite.senderId.mail})
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending invitations</p>
      )}
    </div>
  );
};

export default Likes;
