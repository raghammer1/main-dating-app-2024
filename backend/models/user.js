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
  // friends will be a array of user _id's
  friends: [String],
});

module.exports = mongoose.model('User', userSchema);
