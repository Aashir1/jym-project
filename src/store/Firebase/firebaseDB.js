import Fire from './firebase';
import actionType from '../actionTypes';
import { store } from '../index';
import DBActions from '../action/DBActions';
const fire = Fire.database().ref('/');
export default class FirebaseDB {
    static loadData() {
        console.log('before promise');
        return new Promise((res, rej) => {
            console.log('inside promise');
            fire.once('value', (snapshot) => {
                console.log('snapshot.val(): ', snapshot.val())
                res({ dataObj: toObject(snapshot.val().dataObj), inventory: snapshot.val().inventory, lastSync: snapshot.val().lastSync });
            })
        })
    }
    static setDataObj(obj) {
        return new Promise((res, rej) => {
            console.log('inside promise dataObj: ', obj)
            fire.child('dataObj/').set(obj);
            res(true);
        })
    }
    static setInventory(obj) {
        return new Promise((res, rej) => {
            console.log('inside promise inventory: ', obj)
            fire.child('inventory/').set(obj);
            res(true);
        })
    }
    static pushHistory(obj) {
        let multipath = {};
        // return new Promise((res, rej) => {
        const pushId = fire.child(`member-history/${obj.memberId}/`).push().key;
        multipath[`member-history/${obj.memberId}/${pushId}`] = obj.historyObjUser;
        multipath[`locker-history/${obj.lockerId}/${pushId}`] = obj.historyObjLocker;
        console.log('pushID', pushId);
        return fire.update(multipath)
        // res()
        // })
    }
    static syncDatatoFirebase(multipath) {
        return new Promise((res) => {
            fire.update(multipath)
                .then(() => {
                    fire.update({ lastSync: Date.now().toString() })
                        .then(() => {
                            res();
                        })
                })
        })
    }
    static deleteItem(obj) {
        return new Promise((res, rej) => {
            if (obj.cat == 'inventory') {
                fire.child(`dataObj/${obj.id}`).remove()
                    .then((data) => {
                        fire.child(`inventory/${obj.id}`).remove()
                            .then(() => {
                                res(true);
                            })
                    })
            }
            else {
                fire.child(`dataObj/${obj.id}`).remove()
                    .then((data) => {
                        res(true);
                    })
            }
        })
    }
}


function snapshotToArray(snapshot) {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.data();
        item.key = childSnapshot.id;
        returnArr.push(item);
    });
    return returnArr;
};

function toObject(arr) {
    let rv = {};
    for (let i = 0; i < arr.length; ++i)
        if (arr[i])
            rv[i] = arr[i];
    return rv;
}
