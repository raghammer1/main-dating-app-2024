const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postLogin = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await User.findOne({
      mail: mail.toLowerCase(),
    }).populate('friends', 'username mail images _id');

    // keeping given password first and password from db second is extremely important
    if (user && (await bcrypt.compare(password, user.password))) {
      // send token
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
        friends: user.friends,
      });
    }
    res.status(400).send('Invalid Credential');
  } catch (err) {
    res.status(500).send('Invalid Credential');
  }
};

module.exports = postLogin;
