// const User = require('../../models/user');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// require('dotenv').config();
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const serviceSid = process.env.TWILIO_SERVICE_SID;

// const twilio = require('twilio');
// const client = new twilio(accountSid, authToken);

// // client.incomingPhoneNumbers
// //   .create({
// //     phoneNumber: '+15005550006',
// //     voiceUrl: 'http://demo.twilio.com/docs/voice.xml',
// //   })
// //   .then((incoming_phone_number) => console.log(incoming_phone_number.sid));

// const postTwilio = async (req, res) => {
//   const phoneNumber = req.body.phoneNumber;
//   const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

//   try {
//     // client.verify.v2
//     //   .services(serviceSid)
//     //   .verifications.create({
//     //     to: phoneNumber,
//     //     channel: 'call', // You can also use 'call' for voice verification
//     //   })
//     //   .then((verification) => console.log(verification.status))
//     //   .catch((error) => console.error(error));
//     client.messages
//       .create({
//         body: 'All in the game, yo',
//         from: '+12074898553',
//         to: phoneNumber,
//       })
//       .then((message) => console.log(message.sid));

//     res.status(200).send('OTP sent successfully');
//   } catch (error) {
//     console.error(error);
//     if (error.code === 20008) {
//       res
//         .status(403)
//         .send(
//           'This operation is restricted on trial accounts. Please verify your phone number or upgrade your account.'
//         );
//     } else {
//       res.status(500).send('Failed to send OTP due to an internal error');
//     }
//   }
// };

// module.exports = postTwilio;

require('dotenv').config();
const nodemailer = require('nodemailer');

const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};

const postTwilio = async (req, res) => {
  const toEmail = req.body.toEmail;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const otp = generateOTP();

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: toEmail,
    subject: 'Your OTP',
    text: `Your OTP is: ${otp}`,
    html: `<div><img src="https://images.pexels.com/photos/15107263/pexels-photo-15107263/free-photo-of-night-sky-above-the-trees.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"/><h1>Your OTP</h1><p>Your one-time password (OTP) is: <strong>${otp}</strong></p></div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).send(`OTP SENT TO ${toEmail}`);
  } catch (error) {
    console.error('Failed to send email', error);
    res.status(403).send('Unable to send email error: ' + error);
  }
};

module.exports = postTwilio;
