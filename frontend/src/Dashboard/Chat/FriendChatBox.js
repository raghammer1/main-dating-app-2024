const FriendChatBox = ({ selectedFriend }) => {
  return (
    <div>
      {selectedFriend?.username} - {selectedFriend?.mail}
    </div>
  );
};
export default FriendChatBox;
