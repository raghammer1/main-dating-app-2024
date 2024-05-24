const User = require('../../models/user');
const FriendInvitation = require('../../models/friendInvitation');
const serverStore = require('../../serverStore');

const updateFriendsPendingInvitations = async (userId) => {
  try {
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate('senderId', '_id username mail');

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

module.exports = {
  updateFriendsPendingInvitations,
};
