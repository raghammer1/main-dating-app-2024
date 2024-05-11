const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});
const authController = require('../controllers/auth/authControllers');
const joi = require('joi');

const phoneSchema = joi.object({
  toEmail: joi
    .string()
    // .pattern(
    //   new RegExp('^\\+?1?[-\\s.]?\\(?\\d{3}\\)?[-\\s.]?\\d{3}[-\\s.]?\\d{4}$')
    // )
    .required(),
  // email: joi.string().required(),
});

const verifyEmailOtpSchema = joi.object({
  toEmail: joi.string().required(),
  otp: joi.string().required(),
});

router.post(
  '/send-otp',
  validator.body(phoneSchema),
  authController.controllers.postTwilio
);

router.post(
  '/verify-otp',
  validator.body(verifyEmailOtpSchema),
  authController.controllers.verifyOtp
);

// TEST ROUTE to test our middlewares
const auth = require('../middleware/auth');
router.route('/test').get(auth, (req, res) => {
  res.send('request Passes');
});

module.exports = router;
