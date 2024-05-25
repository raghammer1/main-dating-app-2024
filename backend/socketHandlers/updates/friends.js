const User = require('../../models/user');
const FriendInvitation = require('../../models/friendInvitation');
const serverStore = require('../../serverStore');

const updateFriendsPendingInvitations = async (userId) => {
  try {
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate(
      'senderId',
      '_id username mail images hobbies dob sexOrientation'
    );

    // find if user of specified id has active connections
    const receiverList = serverStore.getOnlineUsers(userId);

    const io = serverStore.getSocketServerInstance();

    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit('friends-invitation', {
        pendingInvitations: pendingInvitations ? pendingInvitations : [],
      });
    });
  } catch (e) {
    console.log(e);
  }
};

const updateFriends = async (userId) => {
  try {
    // Basically for each friend in the friends list we are only wanting the mail, username and _id and hence using populate
    const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
      'friends',
      'mail username _id images'
    );

    console.log('User found:', user);

    if (user) {
      const friendsList = user.friends.map((f) => {
        return {
          id: f._id,
          mail: f.mail,
          username: f.username,
          image: f.images,
        };
      });

      console.log('Friends list:', friendsList);

      // find active connection of the specific ids (online users)
      const receiverList = serverStore.getOnlineUsers(userId);
      if (receiverList.length <= 0) {
        console.log('No online users found for this user.');
        return;
      }
      // get io
      const io = serverStore.getSocketServerInstance();

      receiverList.forEach((receiverSocketId) => {
        io.to(receiverSocketId).emit('friends-list', {
          friends: friendsList ? friendsList : [],
        });
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const updateOnlineFriends = async (userId) => {
  try {
    // find active connection of the specific ids (online users)
    const receiverList = serverStore.getOnlineUsers(userId);
    if (receiverList.length <= 0) {
      return;
    }

    console.log('ONLINE USERS:', receiverList);

    // Basically for each friend in the friends list we are only wanting the mail, username and _id and hence using populate
    const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
      'friends',
      'mail username _id images'
    );

    if (user) {
      const friendsList = user.friends.map((f) => {
        return {
          id: f._id,
          mail: f.mail,
          username: f.username,
          images: f.images,
          isOnline: serverStore.getAllOnlineUsers().includes(f._id.toString()),
        };
      });

      // get io
      const io = serverStore.getSocketServerInstance();

      receiverList.forEach((receiverSocketId) => {
        io.to(receiverSocketId).emit('online-friends-list', {
          onlineUsers: friendsList ? friendsList : [],
        });
      });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  updateFriendsPendingInvitations,
  updateFriends,
  updateOnlineFriends,
};
