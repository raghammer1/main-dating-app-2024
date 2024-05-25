const FriendInvitation = require('../../models/friendInvitation');
const friendsUpdate = require('../../socketHandlers/updates/friends');

const postReject = async (req, res) => {
  try {
    const { inviteId } = req.body;
    const { userId } = req.body;

    // remove the invite from the friendInvitaitons collection
    const inviteExists =
      (await FriendInvitation.exists({ _id: inviteId })) !== null;
    if (inviteExists) {
      await FriendInvitation.findByIdAndDelete(inviteId);
    }

    // update pending invitations
    friendsUpdate.updateFriendsPendingInvitations(userId);
    return res.status(200).send('Invite successfully rejected');
  } catch (e) {
    console.log(e);
    return res.status(500).send('Something went wrong try again');
  }
};

module.exports = postReject;
