const mongoose = require('mongoose');
const AddInventory = require('../models/addInventory');
const AddLocker = require('../models/addLocker');
const AddUser = require('../models/addUser');


class DeleteData {
    static deleteLocker(req, res, id) {
        console.log("req.body: ", req.body);
        if (id) {
            console.log('Locker catched: ', id);
            AddLocker.findByIdAndRemove(id, (err, data) => {
                if (data == null) {
                    return res.status(404).json({ message: "Not Found" });
                }
                if (!err) {
                    return res.json({ data });
                }
                return res.json({ message: err });
            });
        }
    }
    static deleteInventory(req, res, id) {
        if (id) {
            console.log('Inventory catched: ', id);
            AddInventory.findByIdAndRemove(id, (err, data) => {
                if (data == null) {
                    return res.status(404).json({ message: "Not Found" });
                }
                if (!err) {
                    return res.json({ data });
                }
                return res.json({ message: err });
            });
        }
    }
    static deleteUser(req, res, id) {
        if (id) {
            console.log('user catched: ', id);
            AddUser.findByIdAndRemove(id, (err, data) => {
                if (data == null) {
                    return res.status(404).json({ message: "Not Found" });
                }
                if (!err) {
                    return res.json({ data });
                }
                return res.json({ message: err });
            });
        }
    }
}

module.exports = DeleteData;