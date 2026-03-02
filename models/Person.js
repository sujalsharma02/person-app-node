const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    'Mobile number': {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Person', personSchema);
