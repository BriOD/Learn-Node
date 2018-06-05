const mongoose = require('mongoose');
const Schema = mongoos.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid Email Address.'],
        required: 'Please supply an email address.'
    },
    name: {
        type: String,
        required: 'Please supply a name.',
        trim: true
    }
});

userSchema.plugin(passportLocalMongose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
