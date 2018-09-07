const mongoose = require('mongoose');

const addUserSchema = new mongoose.Schema({
    active: Boolean,
    club_id: String,
    country: String,
    email: String,
    gender: String,
    is_pro: Boolean,
    lang: String,
    member_since: String,
    registration_data: String,
    timestamp_edit: String,
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        trim: true
    }
    ,
    member_id: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    rfid_tag: {
        type: String,
        required: true,
        trim: true
    },
    current: {
        assignDate: String,
        checkoutDate: String,
        lockerId: String,
        uid: String,
        product: Array
    },
    imageUrl: {
        type: Object
    },
    lockerId: String
});

const AddUser = mongoose.model('AddUser', addUserSchema);

module.exports = AddUser;