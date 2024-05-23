const express = require('express');
const router = express.Router();
const profileFinderController = require('../controllers/auth/profileFinderController');
const joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

router.get(
  '/profiles',
  validator.query(
    joi.object({
      id: joi.string().required(),
    })
  ),
  profileFinderController.controllers.getProfiles
);

// TEST ROUTE to test our middlewares
const auth = require('../middleware/auth');
router.route('/test').get(auth, (req, res) => {
  res.send('request Passes');
});

module.exports = router;
