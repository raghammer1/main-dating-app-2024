import React from 'react';
import useUserStore from '../../zustand/useUserStore';

const Chat = () => {
  // Access the friends list from the store
  const friendsList = useUserStore((state) => state.friendsList);

  React.useEffect(() => {
    // Assuming addFriendsList is used somewhere to populate the friendsList
    // Simulate fetching friends list if needed
  }, []);

  return (
    <div>
      <h2>Friends List</h2>
      <ul>
        {friendsList.map((friend) => (
          <li key={friend.id}>
            {friend.username} - {friend.mail}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
