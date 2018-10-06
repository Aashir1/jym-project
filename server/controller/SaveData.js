const mongoose = require('mongoose');
const AddUser = require('../models/addUser');
const AddLocker = require('../models/addLocker');
const AddInventory = require('../models/addInventory');
const AddHistoryLocker = require('../models/addHistoryLocker');
const AddHistoryUser = require('../models/addHistoryUser');
const AddLastSync = require('../models/lastSync');
//replace with test3
mongoose.connect('mongodb://localhost:27017/test3', { useNewUrlParser: true });

class SaveData {
    static insertManyUsers(req, res) {
        console.log('req.body in bulk users added: ', req.body);
        if (req.body.membersArray.length > 0) {
            AddUser.collection.insert(req.body.membersArray, (error, data) => {
                if (!error) {
                    return res.json({ data });
                }
                return res.send({ error });
            });
        } else {
            return res.send({ message: 'data length is zero' });
        }
    }
    static insertManyLockers(req, res) {
        console.log('req.body in bulk lockers added: ', req.body.membersArray);
        AddLocker.collection.insert(req.body.membersArray, (error, data) => {
            if (!error) {
                return res.json({ data });
            }
            return res.status(400).send({ error });
        });
    }
    static addUser(req, res) {
        console.log('req.body: ', req.body);
        let userDocument = new AddUser(req.body);
        console.log("userDocument: ", userDocument);
        userDocument.save((error, data) => {
            if (!error) {
                return res.json({ data });
            }
            return res.status(400).send({ error });
        });
    }

    static addLocker(req, res) {
        let lockerDocument = new AddLocker(req.body);
        console.log(req.body);
        lockerDocument.save((error, data) => {
            if (!error) {
                return res.json({ data });
            }
            return res.status(400).send({ error });
        })
    }

    static addInventory(req, res) {
        let inventoryDocument = new AddInventory(req.body);
        console.log(req.body);
        inventoryDocument.save((error, data) => {
            if (!error) {
                return res.json({ data });
            }
            return res.status(400).send({ error });
        })
    }
    static addHistoryLocker(req, res) {
        let historyLockerDocument = new AddHistoryLocker(req.body);
        console.log('addLockerHistory functoins: ', req.body);
        historyLockerDocument.save((error, data) => {
            if (!error) {
                return res.json({ data });
            }
            return res.send({ error });
        });
    }
    static addHistoryUser(req, res) {
        let historyUserDocument = new AddHistoryUser(req.body);
        console.log('addUserHistory functoins: ', req.body);
        historyUserDocument.save((error, data) => {
            if (error) {
                return res.json({ data });
            }
            return res.send({ error });
        });
    }
    static addLastSync(req, res) {
        let dateRef = new Date();
        var query = {},
            update = { lastSync: dateRef.setDate(dateRef.getDate() - 4) },
            options = { upsert: true, new: true, setDefaultsOnInsert: true };

        AddLastSync.findOneAndUpdate(query, update, options, (error, data) => {
            if (!error) {
                return res.json({ data });
            }
            return res.json({ error });
        });
    }
}

module.exports = SaveData;