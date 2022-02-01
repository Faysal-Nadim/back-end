const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) return res.status(400).json({
                message: 'User already registered'
            });
            const {
                firstName,
                lastName,
                email,
                phone,
                password,
                division,
                district,
                deliveryAddress,
                userName
            } = req.body;
            const _user = new User({
                firstName,
                lastName,
                email,
                phone,
                password,
                division,
                district,
                deliveryAddress,
                userName
            });
            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        message: 'Something went wrong!'
                    });
                }
                if (data) {
                    return res.status(201).json({
                        message: 'User created successfully!'
                    });
                }
            });
        });
};


exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error })
            if (user) {

                if (user.authenticate(req.body.password) && user.role === 'user') {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1y' })
                    const { _id, firstName, lastName, email, phone, role, profilePicture, fullName, division, district, thana, deliveryAddress } = user;
                    res.status(200).json({
                        token,
                        user: { _id, firstName, lastName, email, phone, role, profilePicture, fullName, division, district, thana, deliveryAddress }
                    });
                } else {
                    return res.status(400).json({
                        message: 'Invalid Password'
                    });
                }

            } else {
                return res.status(400).json({
                    message: 'Something went wrong'
                });
            }
        });
};


exports.signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Signout successfully!'
    });
}


exports.getUser = (req, res) => {
    const _id = req.user._id;
    User.findOne({ _id: _id })
        .exec((error, user) => {
            if (error) {
                return res.status(400).json({ error })
            }
            if (user) {
                return res.status(200).json({ user });
            }
        })
}

exports.updateProfile = async (req, res) => {
    const { phone, division, district, deliveryAddress } = req.body;
    const id = req.user._id;

    const upUser = { phone, division, district, deliveryAddress };
    await User.findByIdAndUpdate(id, upUser, { new: true })
        .exec((error, upUser) => {
            if (error) {
                return res.status(400).json({ error })
            }
            if (upUser) {
                return res.status(201).json({ upUser });
            }
        })
}