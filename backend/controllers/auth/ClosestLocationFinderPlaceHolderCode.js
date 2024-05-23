const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dating-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Assuming `User` is the Mongoose model from the schema above

app.get('/profiles', async (req, res) => {
  const { userId } = req.query; // ID of the user requesting the profiles

  // Fetch the current user's profile to get their location
  const currentUser = await User.findById(userId);
  if (!currentUser) {
    return res.status(404).send('User not found');
  }

  const { coordinates } = currentUser.location;

  // Find users near the current user
  const profiles = await User.find({
    _id: { $ne: userId },
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates,
        },
        $maxDistance: 10000, // optional, in meters
      },
    },
  });

  res.json(profiles);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
