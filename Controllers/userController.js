const User = require('./../Modules/userModule');
const catchAsync = require('./../Utils/catchAsync');

/**
 * Inside each controller we have specific functionality for each endpoint.
 * Whether it is getting all the data at once or by ID.
 * Or if we want to update (patch) the data or delete etc.
 * Each controller controls the functionlity for these for better structure
 */

//User Route Handlers
exports.GetAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    });
});

exports.CreateNewUser = ((req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
});

exports.GetUserById = ((req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
});

exports.UpdateUser = ((req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
});

exports.DeleteUser = ((req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
});
