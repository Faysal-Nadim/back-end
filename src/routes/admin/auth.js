const express = require('express');
const { signup, signin, signout } = require('../../controller/admin/auth');
const { validateSigninRequest, isRequestValidated, validateSignupRequest } = require('../../validators/auth');
const { requireSignIn } = require('../../middleware');
const router = express.Router();


router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);
router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/admin/signout', requireSignIn, signout);


module.exports = router;