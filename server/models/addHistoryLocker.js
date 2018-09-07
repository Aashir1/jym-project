const mongoose = require('mongoose');

const historySchemaLocker = mongoose.Schema({
    assignDate: String,
    checkout: String,
    checkoutDate: String,
    product: {
        type: Array,
        require: true
    },
    lockerId: {
        type: String,
        require: true
    },
    uid:{
        type: String,
        require: true
    }
});

const AddHistoryLocker = mongoose.model('AddHistoryLocker', historySchemaLocker);

module.exports = AddHistoryLocker;