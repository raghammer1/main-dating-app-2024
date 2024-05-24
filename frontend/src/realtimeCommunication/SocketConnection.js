import io from 'socket.io-client';
// import {
//   setPendingFriendsInvitation,
//   setFriends,
//   setOnlineUsers,
// } from '../store/actions/friendsActions';
// import store from '../store/store';
// import { updateDirectChatHistoryIfActive } from '../shared/utils/chat';

let socket = null;

export const connectWithSocketServer = (token) => {
  const jwtToken = token;
  socket = io('http://localhost:5002', {
    auth: {
      token: jwtToken,
    },
  });

  socket.on('connect', () => {
    console.log(
      'Successfully connected to the server, from userid: ',
      socket.id
    );
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from the server');
  });

  // ! THESE ARE LISTNERS WHICH OPEN UP WHEN THE CONNECTION IS MADE
  socket.on('friends-invitation', (data) => {
    const { pendingInvitations } = data;
    console.log('friend invitation came: ', pendingInvitations);
    // store.dispatch(setPendingFriendsInvitation(pendingInvitations));
  });

  // socket.on('friends-list', (data) => {
  //   const { friends } = data;
  //   console.log('friend invitation came: ', friends);
  //   store.dispatch(setFriends(friends));
  // });

  // socket.on('online-friends-list', (data) => {
  //   const { onlineUsers } = data;
  //   console.log('Online users: ', onlineUsers);
  //   store.dispatch(setOnlineUsers(onlineUsers));
  // });

  // // socket.on('direct-message', () => {});
  // socket.on('direct-chat-history', (data) => {
  //   console.log('DIRECT CHAT HISTORY CAME FROM THE SERVER', data);
  //   updateDirectChatHistoryIfActive(data);
  // });
};

export const disconnectFromSocketServer = () => {
  if (socket) {
    socket.disconnect();
  }
};

// !THESE ARE GETTERS
// export const sendDirectMessage = (data) => {
//   socket.emit('direct-message', data);
// };

// export const getDirectChatHistory = (data) => {
//   // console.log('HERE2', socket);
//   socket.emit('direct-chat-history', data);
// };
