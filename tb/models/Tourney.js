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
        type: Date,
        default: Date.now(),
        required: `Please enter this tourney's date`
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [{
            type: Number,
            required: 'You must supply coordinates!'
        }],
        address: {
            type: String,
            required: 'You must supply an address!'
        }
    }
});

module.exports = mongoose.model('Tourney', tourneySchema);