const mongoose = require('mongoose');

const addInventorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        trim: true
    },
    qty: {
        type: String,
        trim: true
    },
    rfid_tag: {
        type: String,
        trim: true
    },
    consumeable: Boolean
});

const AddInventory = mongoose.model('AddInventory', addInventorySchema);

module.exports = AddInventory;