import React from 'react';
import useUserStore from '../../zustand/useUserStore';

const Chat = () => {
  // Access the friends list and online friends list from the store
  const friendsList = useUserStore((state) => state.friendsList);
  const onlineFriendsList = useUserStore((state) => state.onlineFriendsList);

  // Helper function to check if a friend is online
  const isOnline = (friendId) => {
    const onlineFriend = onlineFriendsList.find(
      (onlineFriend) => onlineFriend.id === friendId
    );
    return onlineFriend ? onlineFriend.isOnline : false;
  };

  return (
    <div>
      <h2>Friends List</h2>
      <ul>
        {friendsList.map((friend) => (
          <li key={friend.id} style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: isOnline(friend.id) ? 'green' : 'red',
                marginRight: '8px',
              }}
            ></span>
            {friend.username} - {friend.mail}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
