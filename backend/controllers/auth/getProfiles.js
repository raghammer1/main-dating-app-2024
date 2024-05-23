const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getProfiles = async (req, res) => {
  const { id } = req.query; // ID of the user requesting the profiles
  const userId = id;

  // Fetch the current user's profile to get their location
  const currentUser = await User.findById(userId);
  if (!currentUser) {
    return res.status(404).send('User not found');
  }

  const { coordinates } = currentUser.location;

  const seenProfiles = currentUser.seenProfiles || [];

  // Find users near the current user
  const profiles = await User.find({
    _id: { $ne: userId, $nin: seenProfiles },
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates,
        },
        $maxDistance: 1000000, // optional, in meters
      },
    },
  })
    .limit(5)
    .select(
      'username mail images dob gender genderInterest relationIntent sexOrientation location hobbies'
    );

  currentUser.seenProfiles = [
    ...currentUser.seenProfiles,
    ...profiles.map((profile) => profile._id),
  ];
  await currentUser.save();

  return res.status(201).json({ profiles });
};

module.exports = getProfiles;
