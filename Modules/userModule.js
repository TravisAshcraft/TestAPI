const mongoose = require('mongoose');
const validator = require('validator');

//describes what is required to create a colleciton on mongo
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'A user must have a username'],
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate:[validator.isEmail, 'Please provide a valid email']
    },
    avatar: {
        type: String
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    passwordConfirm: {
        type: String,
        required: true

    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;