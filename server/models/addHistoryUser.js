const mongoose = require('mongoose');

const historySchemaUser = mongoose.Schema({
    checkDate: String,
    assignDate: String,
    checkout: String,
    checkoutDate: String,
    product: {
        type: Array,
        require: true
    },
    uid: {
        type: String,
        require: true
    },
    lockerId: {
        type: String,
        require: true
    }
});

const AddHistoryUser = mongoose.model('AddHistoryUser', historySchemaUser);

module.exports = AddHistoryUser;