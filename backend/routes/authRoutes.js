const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/authControllers');
const joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const registerSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
  mail: joi.string().email().required(),
  dob: joi.date().iso().required(),
  gender: joi.string().required(),
  genderInterest: joi.string().required(),
  relationIntent: joi.string().required(),
  sexOrientation: joi.string().required(),
  images: joi.array().items(joi.string()).required(),
  phoneNumber: joi.string().required(),
  coordinates: joi.required(),
});

const loginSchema = joi.object({
  password: joi.string().min(6).max(12).required(),
  mail: joi.string().email().required(),
});

// Above are two validator schemas to make sure the data we get fulfills our requirements

// Checking the validator on route if the validator fails the post request will never be executed
router
  .route('/register')
  .post(
    validator.body(registerSchema),
    authController.controllers.postRegister
  );

router.post(
  '/login',
  validator.body(loginSchema),
  authController.controllers.postLogin
);

// TEST ROUTE to test our middlewares
const auth = require('../middleware/auth');
router.route('/test').get(auth, (req, res) => {
  res.send('request Passes');
});

module.exports = router;
