const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uploadBase64Image = require('../../fileUploader/uploadFile');

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
      coordinates,
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

    // const imagesGoogleDoc = await Promise.all(
    //   images.map((image, index) =>
    //     uploadBase64Image(image, `${username}-image-${index}`)
    //   )
    // );
    const imagesGoogleDoc = await Promise.all(
      images.map(async (image, index) => {
        const originalUrl = await uploadBase64Image(
          image,
          `${username}-image-${index}`
        );
        return originalUrl.replace('uc?id=', 'thumbnail?id=');
      })
    );

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
      images: imagesGoogleDoc,
      phoneNumber,
      location: {
        type: 'Point',
        coordinates: [coordinates.lon, coordinates.lat],
      },
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
      location: user.location,
    });
  } catch (err) {
    return res
      .status(500)
      .send(`unknown error occurred please try again ${err}`);
  }
};

module.exports = postRegister;
