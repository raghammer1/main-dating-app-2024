const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postRegister = async (req, res) => {
  // res.send('register route');
  try {
    const {
      username,
      password,
      mail,
      dob,
      gender,
      genderInterest,
      relationIntent,
      sexOrientation,
      images,
      phoneNumber,
    } = req.body;

    // check if user exists
    let userExists = await User.exists({ mail: mail.toLowerCase() });

    if (userExists) {
      return res.status(409).send('Email already in use');
    }

    // check if phone number already exists
    userExists = await User.exists({ phoneNumber: phoneNumber.toLowerCase() });

    if (userExists) {
      return res.status(409).send('Phone Number already in use already in use');
    }

    // encrypt password
    const encryptedPassword = password;

    // create user documnet and save in the db
    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
      dob: new Date(dob),
      gender,
      genderInterest,
      relationIntent,
      sexOrientation,
      images,
      phoneNumber,
    });

    //! create the jwt token so that user can be logged in and when token expires user is logged out
    const token = jwt.sign(
      {
        userId: user._id,
        mail,
      },
      process.env.TOKEN_KEY,
      { expiresIn: '24hr' }
    );

    return res.status(201).json({
      username: user.username,
      token,
      mail: user.mail,
      _id: user._id,
      dob: user.dob,
      gender: user.gender,
      genderInterest: user.genderInterest,
      relationIntent: user.relationIntent,
      sexOrientation: user.sexOrientation,
      images: user.images,
      phoneNumber: user.phoneNumber,
    });
  } catch (err) {
    return res.status(500).send('error occurred please try again');
  }
};

module.exports = postRegister;
