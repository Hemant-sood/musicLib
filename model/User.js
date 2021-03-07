const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id }, process.env.jwtKey);
}


const User = mongoose.model('User', userSchema);

module.exports = User;