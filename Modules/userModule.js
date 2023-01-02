const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: true,
        validate: {
            //this only works on CREATE and SAVE!!!
            validator: function(el){
                return el === this.password;
            },
            message: 'Passowrds are not the same!'
        }

    }
});

userSchema.pre('save', async function(next) {
    //We only encrypt password on create and save
    if(!this.isModified('password')) return next();

    //Hash power set to 12
    this.password = await bcrypt.hash(this.password, 12);

    //We set the confirm password to undefined after Creat or Save to get rid of it we only need one 
    this.passwordConfirm = undefined;
    next();
})

userSchema.methods.correctPassword = function(canidatePassword, userPassword) {
    const res = bcrypt.compareSync(canidatePassword, userPassword);

    return res;
}

const User = mongoose.model('User', userSchema);

module.exports = User;