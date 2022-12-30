const User = require('./../Modules/userModule');
const catchAsync = require('./../Utils/catchAsync');

exports.signUp = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);

    res.status(201).json({
        status:'success',
        data:{
            user: newUser
        }
    });
});

