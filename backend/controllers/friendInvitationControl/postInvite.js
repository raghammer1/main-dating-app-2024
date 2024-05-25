const User = require('../../models/user');
const FriendInvitation = require('../../models/friendInvitation');
const friendsUpdate = require('../../socketHandlers/updates/friends');

const postInvite = async (req, res) => {
  const { receiverId, senderId } = req.body;

  // Check if invite has been already sent
  const invitationAlreadySent = await FriendInvitation.findOne({
    senderId: senderId,
    receiverId: receiverId,
  });
  if (invitationAlreadySent) {
    return res.status(409).send('Invitation already sent');
  }

  // Now we can create a new invitation for a friend add
  await FriendInvitation.create({
    senderId: senderId,
    receiverId: receiverId,
  });

  // !if invite is successfully created then update friends invitation if other user is online

  // !Send the friend  request
  friendsUpdate.updateFriendsPendingInvitations(receiverId.toString());

  return res.status(201).send(`Invitation sent successfully to}`);
};

module.exports = postInvite;
