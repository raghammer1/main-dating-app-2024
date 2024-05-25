// import React, { useState } from 'react';
// import useUserStore from '../../zustand/useUserStore';
// import FriendsList from './FriendsList';
// import FriendChatBox from './FriendChatBox';

// const Chat = () => {
//   const [selectedFriend, setSelectedFriend] = useState(null);

//   // Access the friends list and online friends list from the store
//   const friendsList = useUserStore((state) => state.friendsList);
//   const onlineFriendsList = useUserStore((state) => state.onlineFriendsList);

//   // Helper function to check if a friend is online
//   const isOnline = (friendId) => {
//     const onlineFriend = onlineFriendsList.find(
//       (onlineFriend) => onlineFriend.id === friendId
//     );
//     return onlineFriend ? onlineFriend.isOnline : false;
//   };

//   return (
//     <div>
//       <FriendsList
//         friendsList={friendsList}
//         isOnline={isOnline}
//         setSelectedFriend={setSelectedFriend}
//       />
//       <FriendChatBox selectedFriend={selectedFriend} />
//     </div>
//   );
// };

// export default Chat;
import React, { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import useUserStore from '../../zustand/useUserStore';
import FriendsList from './FriendsList';
import FriendChatBox from './FriendChatBox';

const useStyles = makeStyles({
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  chatPaper: {
    width: '90%',
    height: '90%',
    display: 'flex',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  friendsList: {
    width: '30%',
    backgroundColor: '#fff3e0',
    borderRight: '1px solid #ddd',
  },
  chatBox: {
    width: '70%',
    backgroundColor: '#ffffff',
  },
  header: {
    padding: '10px 0',
    textAlign: 'center',
  },
  friendsHeader: {
    backgroundColor: '#ffccbc',
  },
  chatHeader: {
    backgroundColor: '#ffab91',
  },
});

const Chat = () => {
  const classes = useStyles();
  const [selectedFriend, setSelectedFriend] = useState(null);

  // Access the friends list and online friends list from the store
  const friendsList = useUserStore((state) => state.friendsList);

  return (
    <Box className={classes.container}>
      <Paper className={classes.chatPaper}>
        <Box
          className={`${classes.friendsList} ${classes.header} ${classes.friendsHeader}`}
        >
          <Typography variant="h6">Friends</Typography>
          <FriendsList
            friendsList={friendsList}
            setSelectedFriend={setSelectedFriend}
            selectedFriend={selectedFriend}
          />
        </Box>
        <Box
          className={`${classes.chatBox} ${classes.header} ${classes.chatHeader}`}
        >
          <Typography variant="h6">Chat</Typography>
          <FriendChatBox selectedFriend={selectedFriend} />
        </Box>
      </Paper>
    </Box>
  );
};

export default Chat;
