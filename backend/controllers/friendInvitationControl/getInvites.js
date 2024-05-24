const FriendInvitation = require('../../models/friendInvitation');

const getInvites = async (req, res) => {
  const { id } = req.query;
  const pendingInvites = await FriendInvitation.find({
    receiverId: id,
  }).populate('senderId', '_id username mail images hobbies');
  return res.status(201).json(pendingInvites);
};

module.exports = getInvites;
