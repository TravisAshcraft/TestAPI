const jwt = require('jsonwebtoken');
const User = require('./../Modules/userModule');
const catchAsync = require('./../Utils/catchAsync');

exports.signUp = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    } );

    res.status(201).json({
        status:'success',
        token,
        data:{
            user: newUser
        }
    });
});

