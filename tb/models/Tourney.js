const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const tourneySchema = new mongoose.Schema({
    venue: {
        type: String,
        trim: true,
        required: 'Please enter venue information.'
    },
    buyin: {
        type: String,
        trim: true,
        required: 'Please provide the buy in amount.'
    }, 
    date: {
        type: String,
        trim: true,
        required: `Please enter this tourney's date`
    }
});

module.exports = mongoose.model('Tourney', tourneySchema);