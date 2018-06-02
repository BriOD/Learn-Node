const mongoose = require('mongoose');
const Schema = mongoos.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongose = require('passport-local-mongoose');

const userSchema = new Schema({

});

module.exports = mongoose.model('User', userSchema);
