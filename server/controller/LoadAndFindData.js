const AddInventory = require('../models/addInventory');
const AddLocker = require('../models/addLocker');
const AddUser = require('../models/addUser');
const AddHistoryLocker = require('../models/addHistoryLocker');
const AddHistoryUser = require('../models/addHistoryUser');
const AddLastSync = require('../models/lastSync');

class FindData {
    static getInventory(req, res) {
        AddInventory.find({}, (error, docs) => {
            if (docs == null) {
                return res.status(404).json({ message: "Not Found" });
            }
            if (!error) {
                return res.json({ docs });
            }
            return res.json({ error });
        })
    }
    static getLocker(req, res) {
        AddLocker.find({}, (error, docs) => {
            if (docs == null) {
                return res.status(404).json({ message: "Not Found" });
            }
            if (!error) {
                return res.json({ docs });
            }
            return res.json({ error });
        });
    }
    static getUsers(req, res) {
        AddUser.find({}, (error, docs) => {
            if (docs == null) {
                return res.status(404).json({ message: "Not Found" });
            }
            if (!error) {
                return res.json({ docs });
            }
            return res.json({ error });
        });
    }
    static getHistoryLocker(req, res) {
        AddHistoryLocker.find({}, (error, docs) => {
            if (docs == null) {
                return res.status(404).json({ message: "Not Found" });
            }
            if (!error) {
                return res.json({ docs });
            }
            return res.json({ error });
        });
    }
    static getHistoryUser(req, res) {
        AddHistoryUser.find({}, (error, docs) => {
            if (docs == null) {
                return res.status(404).json({ message: "Not Found" });
            }
            if (!error) {
                return res.json({ docs });
            }
            return res.json({ error });
        });
    }
    static getLastSync(req, res) {
        AddLastSync.find({}, (error, docs) => {
            if (docs == null) {
                return res.status(404).json({ message: "Not Found" });
            }
            if (!error) {
                return res.json({ docs });
            }
            return res.json({ error });
        });
    }
}

module.exports = FindData;