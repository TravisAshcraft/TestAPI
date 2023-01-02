const jwt = require('jsonwebtoken');
const User = require('./../Modules/userModule');
const catchAsync = require('./../Utils/catchAsync');
const AppError = require('./../Utils/appError');

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    } );
};


exports.signUp = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token = jwt.sign(newUser._id);

    res.status(201).json({
        status:'success',
        token,
        data:{
            user: newUser
        }
    });
});

exports.login = catchAsync(async(req, res, next) => {
    const { email, password } = req.body; //this is how the user will send in the login creds

    //1) check if email and password exist
    if( !email || !password ) {
       return next(new AppError('Please provide email and password', 400));
    }

    //2) check if user exists and pass is correct
    const user = await User.findOne({email}).select('+password');

    if( !user ){
        return next(new AppError('Incorrect email or password', 401));
    }else if(!(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    //3) if everything is ok, send token to client
    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token
    });
});
