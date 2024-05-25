import styled from 'styled-components';
import useUserStore from '../../zustand/useUserStore';

const InviteCard = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'wheat',
  borderBottom: '1px solid black',
  paddingTop: '5px',
  paddingBottom: '5px',
  '&:last-child': {
    borderBottom: '0',
  },
  '&:hover': {
    cursor: 'pointer',
  },
});

const StatusIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.isOnlineCheck ? 'green' : 'red')};
  margin-left: 10px;
`;

const ImageContainer = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FriendsList = ({ friendsList, setSelectedFriend, selectedFriend }) => {
  console.log('FRIENDSIEUHRYOWEGRUYEWGRIYUWEGRYG', friendsList);
  // Helper function to check if a friend is online
  const onlineFriendsList = useUserStore((state) => state.onlineFriendsList);

  const isOnline = (friendId) => {
    const onlineFriend = onlineFriendsList.find(
      (onlineFriend) => onlineFriend.id === friendId
    );
    return onlineFriend ? onlineFriend.isOnline : false;
  };

  return (
    <div
      style={{
        marginTop: '30px',
        paddingLeft: '10px',
        paddingRight: '10px',
        backgroundColor: 'wheat',
      }}
    >
      {friendsList.map((friend) => (
        <InviteCard key={friend.id} onClick={() => setSelectedFriend(friend)}>
          <ImageContainer>
            <img src={friend.image[0]} alt={`${friend.username}'s avatar`} />
          </ImageContainer>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: '21px' }}>{friend.username}</span>
            <StatusIndicator isOnlineCheck={isOnline(friend.id)} />
          </div>
        </InviteCard>
      ))}
    </div>
  );
};
export default FriendsList;
