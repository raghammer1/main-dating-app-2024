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
  // friends will be a array of type User which is also a schema
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('User', userSchema);
