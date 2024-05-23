const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  mail: { type: String, unique: true },
  username: { type: String },
  password: { type: String },
  dob: { type: Date },
  gender: { type: String },
  genderInterest: { type: String },
  relationIntent: { type: String },
  sexOrientation: { type: String },
  images: [String],
  phoneNumber: { type: String },
  hobbies: [String],
  // friends will be a array of user _id's s
  friends: [String],
  likedByUsers: [String],
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
  seenProfiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', userSchema);
