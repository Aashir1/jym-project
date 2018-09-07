const AddUser = require('../models/addUser');
const AddLocker = require('../models/addLocker');
const AddInventory = require('../models/addInventory');


class UpdateData {
    static updateInventory(req, res) {
        console.log('req.body in updateInventory: ', req.body);
        let { data, id } = req.body;
        AddInventory.findByIdAndUpdate(id, data, { new: true, $set: { 'meta.favs': 56 } }, (err, data) => {
            if (data === null) {
                return res.status(404).json({ message: "Not Found" });
            }
            if (!err) {
                return res.json({ data });
            }
            return res.json({ message: err });
        })
    }

    static updateLocker(req, res) {
        console.log('req.body in updateLocker: ', req.body);
        let { data, id } = req.body;
        // console.log(obj, "objjjjjjjjjjjjj")
        AddLocker.findByIdAndUpdate(id, data, { new: true, $set: { 'meta.favs': 56 } }, (err, data) => {
            if (data === null) {
                return res.status(404).json({ message: "Not Found" });
            }
            if (!err) {
                return res.json({ data });
            }
            return res.json({ message: err });
        })
    }

    static updateUser(req, res) {
        console.log('req.body in updateUser: ', req.body);
        let { data, id } = req.body;
        AddUser.findByIdAndUpdate(id, data, { new: true, $set: { 'meta.favs': 56 } }, (err, data) => {
            if (data === null) {
                return res.status(404).json({ message: "Not Found" });
            }
            if (!err) {
                return res.json({ data });
            }
            return res.json({ message: err });
        })
    }
}

module.exports = UpdateData;