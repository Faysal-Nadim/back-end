const { check, validationResult } = require('express-validator');

exports.validateSignupRequest = [
    check('firstName')
    .notEmpty()
    .withMessage('First Name is required.'),
    check('lastName')
    .notEmpty()
    .withMessage('Last Name is required.'),
    check('email')
    .isEmail()
    .withMessage('Enter a valid email address.'),
    check('password')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 character long')
];

exports.validateSigninRequest = [
    check('email')
    .isEmail()
    .withMessage('Invalid Email Address'),
    check('password')
    .isLength({min: 6})
    .withMessage('Invalid Password')
]

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0 ){
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
}