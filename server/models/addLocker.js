const mongoose = require('mongoose');

const addLockerSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        trim: true
    },
    rfid_tag: {
        type: String,
        trim: true
    },
    isAvailable: Boolean,
    current: {
        checkDate: String,
        checkout: String,
        uid: String,
        product: Array
    }
});

const AddLocker = mongoose.model('AddLocker', addLockerSchema);

module.exports = AddLocker;