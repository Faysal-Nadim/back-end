const express = require('express');
const { signup, signin, signout, updateProfile, getUser } = require('../controller/auth');
const { validateSigninRequest, isRequestValidated, validateSignupRequest } = require('../validators/auth');
const { requireSignIn, userMiddleware } = require('../middleware')
const router = express.Router();


router.post('/signin', validateSigninRequest, isRequestValidated, signin);
router.post('/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/signout', requireSignIn, signout);
router.get('/user/get', requireSignIn, userMiddleware, getUser);
router.post('/user/update', requireSignIn, userMiddleware, updateProfile);


module.exports = router;