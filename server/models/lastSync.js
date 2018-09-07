const mongoose = require('mongoose');


const lastSyncSchema = mongoose.Schema({
    lastSync: String
});

const AddLastSync = mongoose.model('AddLastSync', lastSyncSchema);

module.exports = AddLastSync;