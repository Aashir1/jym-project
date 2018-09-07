import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import actionTypes from '../actionTypes';
import FirebaseDB from '../Firebase/firebaseDB';
import DBActions from '../action/DBActions';
import actionType from '../actionTypes';
import HttpService from '../../Services/http';

export default class EpicActions {

    static addHistoryUser($action) {
        return $action.ofType(actionTypes.ADD_HISTORY_USER_PROGRESS)
            .switchMap(({ payload }) => {
                return HttpService.post('http://localhost:3005/addHistoryuser', payload)//make call on node server and complete history work
                    .pluck('response')
                    .map(({ data }) => {
                        console.log('addedHistoryLocker: ', data);
                        return {
                            type: null
                        }
                    })
            })
            .catch(err => {
                return Observable.of({ type: actionTypes.ADD_HISTORY_USER_FAIL, payload: err.message });
            })
    }
    static addHistoryLocker($action) {
        return $action.ofType(actionTypes.ADD_HISTORY_LOCKER_PROGRESS)
            .switchMap(({ payload }) => {
                return HttpService.post('http://localhost:3005/addHistorylocker', payload)//make call on node server and complete history work
                    .pluck('response')
                    .map(({ data }) => {
                        console.log('addedHistoryLocker: ', data);
                        return {
                            type: null
                        }
                    })
            })
            .catch(err => {
                return Observable.of({ type: actionTypes.ADD_HISTORY_LOCKER_FAIL, payload: err.message });
            })
    }
    static updateUser($action) {
        return $action.ofType(actionTypes.UPDATE_USER_PROGRESS)
            .switchMap(({ payload }) => {
                return HttpService.post(`http://localhost:3005/updateuser`, payload)
                    .pluck('response')
                    .map(({ data }) => {
                        console.log('Mongo UpdatedUser', data);
                        let obj = {};
                        obj[data.rfid_tag] = {
                            firstName: data.firstName,
                            lastName: data.lastName,
                            name: data.name,
                            current: data.current,
                            member_id: data.member_id,
                            rfid_tag: data.rfid_tag,
                            type: data.type,
                            id: data._id,
                            lockerId: data.lockerId
                        }
                        return {
                            type: actionTypes.UPDATE_USER_SUCCEED,
                            payload: obj
                        }
                    })
                    .catch(err => {
                        return Observable.of({ type: actionTypes.UPDATE_USER_FAIL, payload: err.message });
                    })
            })
    }

    static updateLocker($action) {
        return $action.ofType(actionTypes.UPDATE_LOCKER_PROGRESS)
            .switchMap(({ payload }) => {
                return HttpService.post(`http://localhost:3005/updatelocker`, payload)
                    .pluck('response')
                    .map(({ data }) => {
                        console.log('Mongo UpdatedLocker', data);
                        let obj = {};
                        obj[data.rfid_tag] = {
                            current: data.current,
                            id: data._id,
                            isAvailable: data.isAvailable,
                            name: data.name,
                            type: data.type,
                            rfid_tag: data.rfid_tag

                        }
                        return {
                            type: actionTypes.UPDATE_LOCKER_SUCCEED,
                            payload: obj
                        }
                    })
                    .catch(err => {
                        return Observable.of({ type: actionTypes.UPDATE_LOCKER_FAIL, payload: err.message });
                    })
            })
    }
    static updateInventory($action) {
        return $action.ofType(actionTypes.UPDATE_INVENTORY_PROGRESS)
            .mergeMap(({ payload }) => {
                return HttpService.post(`http://localhost:3005/updateinventory`, payload)
                    .pluck('response')
                    .map(({ data }) => {
                        let obj = {};
                        obj[data.rfid_tag] = {
                            consumeable: data.consumeable,
                            name: data.name,
                            qty: data.qty,
                            rfid_tag: data.rfid_tag,
                            type: data.type,
                            id: data._id
                        }
                        return {
                            type: actionTypes.UPDATE_INVENTORY_SUCCEED,
                            payload: obj
                        }
                    })
                    .catch(err => {
                        return Observable.of({ type: actionTypes.UPDATE_INVENTORY_FAIL, payload: err.message });
                    })
            })
    }
    static deleteInventory($action) {
        return $action.ofType(actionTypes.DELETE_INVENTORY_PROGRESS)
            .switchMap(({ payload }) => {
                return HttpService.post(`http://localhost:3005/deleteinventory/${payload}`)
                    .pluck('response')
                    .map(({ data }) => {
                        console.log('deleted product: ', data);
                        return {
                            type: actionTypes.DELETE_INVENTORY_SUCCEED,
                            payload: data
                        }
                    })
                    .catch(err => {
                        return Observable.of({ type: actionTypes.DELETE_INVENTORY_FAIL, payload: err.message });
                    })
            })
    }
    static addInventory($action) {
        return $action.ofType(actionTypes.ADD_INVENTORY_PROGRESS)
            .switchMap(({ payload }) => {
                return HttpService.post(`http://localhost:3005/addInventory`, payload)
                    .pluck('response')
                    .map(({ data }) => {
                        let obj = {};
                        obj[data.rfid_tag] = {
                            consumeable: data.consumeable,
                            name: data.name,
                            qty: data.qty,
                            rfid_tag: data.rfid_tag,
                            type: data.type,
                            id: data._id
                        }
                        console.log('inventory add: ', data);
                        return {
                            type: actionTypes.ADD_INVENTORY_SUCCEED,
                            payload: obj
                        }
                    })
                    .catch(err => {
                        return Observable.of({ type: actionTypes.ADD_INVENTORY_FAIL, payload: err.message });
                    })
            })
    }

    static deleteLocker($action) {
        return $action.ofType(actionTypes.DELETE_LOCAL_LOCKER_PROGRESS)
            .switchMap(({ payload }) => {
                return HttpService.post(`http://localhost:3005/deletelocker/${payload}`)
                    .pluck('response')
                    .map(({ data }) => {
                        return {
                            type: actionTypes.DELETE_LOCAL_LOCKER_SUCCEED,
                            payload: data
                        }
                    })
                    .catch(err => {
                        return Observable.of({ type: actionTypes.DELETE_LOCAL_LOCKER_FAIL, payload: err.message });
                    })
            })
    }

    static addLocker($action) {
        return $action.ofType(actionTypes.ADD_LOCKER_PROGRESS)
            .switchMap(({ payload }) => {
                return HttpService.post(`http://localhost:3005/addLocker`, payload)
                    .pluck('response')
                    .map(({ data }) => {
                        let obj = {};
                        obj[data.rfid_tag] = {
                            current: data.current,
                            id: data._id,
                            isAvailable: data.isAvailable,
                            name: data.name,
                            type: data.type,
                            rfid_tag: data.rfid_tag

                        }
                        return {
                            type: actionTypes.ADD_LOCKER_SUCCEED,
                            payload: obj
                        }
                    })
                    .catch(err => {
                        return Observable.of({ type: actionTypes.ADD_LOCKER_FAIL, payload: err.message });
                    })
            })
    }
    static deleteUser($action) {
        return $action.ofType(actionTypes.DELETE_USER_PROGRESS)
            .switchMap(({ payload }) => {
                return HttpService.post(`http://localhost:3005/deleteuser/${payload}`)
                    .pluck('response')
                    .map(res => {
                        // console.log('deleted User: ', res);
                        return {
                            type: actionTypes.DELETE_USER_SUCCEED,
                            payload: res.data
                        }
                    })
                    .catch(err => {
                        return Observable.of({ type: actionTypes.DELETE_USER_SUCCEED, payload: err.message })
                    })
            })
    }
    static addUser($action) {
        return $action.ofType(actionTypes.ADD_USER_PROGRESS)
            .switchMap(({ payload }) => {
                // return Observable.ajax({
                //     url: `http://localhost:3005/addUser`,
                //     method: 'POST',
                //     body: payload,
                //     async: true,
                //     crossDomain: true,
                //     responseType: 'json',
                //     createXHR: () => new XMLHttpRequest()
                // })
                console.log('payload from addUserEpic: ', payload);
                return HttpService.post(`http://localhost:3005/addUser`, payload)
                    .pluck('response')
                    .map(({ data }) => {
                        let obj = {};
                        obj[data.rfid_tag] = {
                            firstName: data.firstName,
                            lastName: data.lastName,
                            name: data.name,
                            current: data.current,
                            member_id: data.member_id,
                            rfid_tag: data.rfid_tag,
                            type: data.type,
                            id: data._id,
                            lockerId: data.lockerId
                        }
                        console.log('after user added obj: ', obj);
                        return {
                            type: actionTypes.ADD_USER_SUCCEED,
                            payload: obj
                        }
                    })
                    .catch(err => {
                        return Observable.of({ type: actionTypes.ADD_USER_FAIL, payload: err.message });
                    })
            })
    }
    /* ************************** */
    // static loadData($action) {
    //     return $action.ofType(actionTypes.LOAD_DATA_PROGRESS)
    //         .switchMap(({payload}) => {
    //             return HttpService.post(`http://localhost:3005/addManyLockers`, payload.lockers)
    //                 .map(data => {
    //                     console.log("inserted Obj: ", data);

    //                     return {
    //                         // type: actionType.LOAD_DATA_SUCCEED,
    //                         // payload: data
    //                         type: null
    //                     }
    //                 })
    //                 .catch((err) => {
    //                     return Observable.of({ type: actionTypes.LOAD_DATA_FAIL, payload: err.message });
    //                 })
    //         })
    // }
    /* ************************** */

    static setDataObj($action) {
        return $action.ofType(actionTypes.SET_DATAOBJ_PROGRESS)
            .switchMap(({ payload }) => {
                return Observable.fromPromise(FirebaseDB.setDataObj(payload))
                    .map(data => {
                        return {
                            type: actionTypes.SET_CURRENTUSER_SUCCEED,
                            payload: data
                        }
                    })
                    .catch(err => {
                        return Observable.of({ type: actionTypes.SET_DATAOBJ_FAIL, payload: err.message })
                    })
            })
    }
    static setInventory($action) {
        return $action.ofType(actionTypes.SET_INVENTORY_PROGRESS)
            .switchMap(({ payload }) => {
                return Observable.fromPromise(FirebaseDB.setInventory(payload))
                    .map(data => {
                        return {
                            type: actionTypes.SET_INVENTORY_SUCCEED,
                            payload: data
                        }
                    })
                    .catch(err => {
                        return Observable.of({ type: actionTypes.SET_INVENTORY_FAIL, payload: err.message })
                    })
            })
    }

    static pushHistory($action) {
        return $action.ofType(actionTypes.PUSH_HISTORY_PROGRESS)
            .switchMap(({ payload }) => {
                return Observable.fromPromise(FirebaseDB.pushHistory(payload))
                    .map(data => {
                        return {
                            type: actionTypes.PUSH_HISTORY_SUCCEED,
                            payload: data
                        }
                    })
                    .catch(err => {
                        return Observable.of({ type: actionTypes.PUSH_HISTORY_FAIL, payload: err.message })
                    })
            })
    }

    static setLastSync(action$) {
        return action$.ofType(actionTypes.SYNC_DATA_PROGRESS)
            .switchMap(() => {
                return HttpService.post(`http://localhost:3005/addlastsync`)
                    .pluck('response')
                    .map((data) => {
                        console.log('uuuuuuuuuuupdate lastSync: ', data);
                        return {
                            type: null
                        }
                    })
                    .catch(err => {
                        return Observable.of({ type: actionTypes.SYNC_DATA_FAIL, payload: err.message });
                    })
            })
    }

    static syncData(action$) {
        let multipathForStore = {};
        return action$.ofType(actionTypes.SYNC_DATA_PROGRESS)
            .switchMap(({ payload }) => {
                return Observable.ajax({
                    url: `https://api.virtuagym.com/api/v1/club/26147/member?api_key=3fqoM6D9Lbz1ftGPvrMZg9YfFJW9s1noOAeYg3PBkC&club_secret=CS-26147-ACCESS-vrwzgdRxUaPvTcNGkKVgiPoYs&sync_from=${payload}`,
                    method: 'GET',
                    async: true,
                    crossDomain: true,
                    responseType: 'json',
                    createXHR: () => new XMLHttpRequest()
                })
                    .pluck('response').map(xdata => {
                        let multipath = {};
                        let tempArray = JSON.parse(localStorage.getItem('tempArray'));
                        console.log('TTTTTTTTTTempArray: ', tempArray)
                        console.log('xdata: ', xdata);
                        xdata.result.forEach((data, i) => {
                            if (tempArray.indexOf(data.member_id.toString()) === -1) {
                                if (data.rfid_tag) {
                                    data['type'] = 'member';
                                    data['name'] = `${data.firstname} ${data.lastname}`
                                    data[`current`] = { assignDate: "", checkoutDate: "", lockerId: "", product: [] };
                                    // multipath[`dataObj/${data.rfid_tag}/`] = data;
                                    multipathForStore[data.rfid_tag] = data;
                                } else {
                                    let id = randomString();
                                    data['rfid_tag'] = data.member_id;
                                    data['type'] = 'member';
                                    data['name'] = `${data.firstname} ${data.lastname}`
                                    data[`current`] = { assignDate: "", checkoutDate: "", lockerId: "", product: [] };
                                    // multipath[`dataObj/${data.member_id}/`] = data;
                                    multipathForStore[data.member_id] = data;
                                }
                            }
                        })
                        console.log('after forEach: ', multipath);
                        return multipath;
                    }).switchMap((data) => {
                        console.log('data: ', multipathForStore);
                        let membersArray = Object.values(multipathForStore);
                        console.log('membersArray: ', membersArray);
                        return HttpService.post(`http://localhost:3005/addManyUsers`, { membersArray })
                            // .pluck('response')
                            .map((data) => {
                                console.log('api users: ', data);
                                let obj = {};
                                data.response.data.ops[0].membersArray.forEach(data => {
                                    obj[data.rfid_tag] = data
                                })
                                return {
                                    type: actionTypes.SYNC_DATA_SUCCEED,
                                    payload: obj
                                }
                            });
                    })
                    .catch(err => {
                        return Observable.of({ type: actionTypes.SYNC_DATA_FAIL, payload: err.message })
                    })
            })
    }

    static deleteItem($action) {
        return $action.ofType(actionTypes.DELETE_LOCKER_PROGRESS)
            .switchMap(({ payload }) => {
                return Observable.fromPromise(FirebaseDB.deleteItem(payload))
                    .map((data) => {
                        return {
                            type: null
                        }
                    })
                    .catch(err => {
                        return Observable.of({ type: actionTypes.DELETE_LOCKER_FAIL, payload: err.message });
                    })
            })
    }

    static loadLocalDataDBLastSync($action) {
        let dataObj = {};
        return $action.ofType(actionTypes.LOAD_LOCALDATADB_PROGRESS)
            .switchMap(({ }) => {
                return HttpService.post(`http://localhost:3005/getlastsync`)
                    .pluck('response')
                    .map(data => {
                        let lastSync = data.docs[0].lastSync;
                        console.log('lllllllllllllastSync: ', typeof lastSync);
                        return {
                            type: actionTypes.LOAD_LOCALDATADB_SUCCEED,
                            payload: lastSync
                            // type: null
                        }
                    })
                    .catch(err => {
                        console.log('err: ', err)
                        return Observable.of({ type: actionTypes.LOAD_DATA_FAIL, payload: err.message });
                    })
            })
    }

    static loadLocalDataDBLockers($action) {
        let dataObj = {};
        return $action.ofType(actionTypes.LOAD_LOCALDATADB_PROGRESS)
            .switchMap(({ }) => {
                return Observable.ajax({
                    url: `http://localhost:3005/getlockers`,
                    method: 'POST',
                    async: true,
                    crossDomain: true,
                    responseType: 'json',
                    createXHR: () => new XMLHttpRequest()
                })
                    .pluck('response')
                    .map(data => {
                        console.log('data: ', data);
                        data.docs.forEach(data => {
                            dataObj[data.rfid_tag] = {
                                current: data.current,
                                isAvailable: data.isAvailable,
                                name: data.name,
                                rfid_tag: data.rfid_tag,
                                type: data.type,
                                id: data._id
                            }
                        })
                        return {
                            type: actionTypes.LOAD_LOCALDATADB_SUCCEED,
                            payload: dataObj
                        }
                    })
                    .catch(err => {
                        console.log('err: ', err)
                        return Observable.of({ type: actionTypes.LOAD_DATA_FAIL, payload: err.message });
                    })
            })
    }
    static loadLocalDataDBInventory($action) {
        let dataObj = {};
        return $action.ofType(actionTypes.LOAD_LOCALDATADB_PROGRESS)
            .switchMap(({ }) => {
                return Observable.ajax({
                    url: `http://localhost:3005/getinventory`,
                    method: 'POST',
                    async: true,
                    crossDomain: true,
                    responseType: 'json',
                    createXHR: () => new XMLHttpRequest()
                })
                    .pluck('response')
                    .map(data => {
                        data.docs.forEach(data => {
                            dataObj[data.rfid_tag] = {
                                consumeable: data.consumeable,
                                name: data.name,
                                type: data.type,
                                rfid_tag: data.rfid_tag,
                                qty: data.qty,
                                id: data._id
                            }
                        })
                        return {
                            type: actionTypes.LOAD_LOCALDATADB_INVENTORY_SUCCEED,
                            payload: dataObj
                        }
                    })
                    .catch(err => {
                        console.log('err: ', err)
                        return Observable.of({ type: actionTypes.LOAD_DATA_FAIL, payload: err.message });
                    })
            })
    }
    static loadLocalDataDBUsers($action) {
        let dataObj = {};
        return $action.ofType(actionTypes.LOAD_LOCALDATADB_PROGRESS)
            .switchMap(({ }) => {
                console.log('request send...........')
                return Observable.ajax({
                    url: `http://localhost:3005/getusers`,
                    method: 'POST',
                    async: true,
                    crossDomain: true,
                    responseType: 'json',
                    createXHR: () => new XMLHttpRequest()
                })
                    .pluck('response')
                    .map(data => {
                        console.log('local API data: ', data);
                        let obj = {};
                        data.docs.forEach(data => {
                            dataObj[data.rfid_tag] = {
                                firstName: data.firstName,
                                lastName: data.lastName,
                                member_id: data.member_id,
                                name: data.name,
                                rfid_tag: data.rfid_tag,
                                current: data.current,
                                type: data.type,
                                id: data._id
                            }
                        })
                        return {
                            type: actionTypes.LOAD_LOCALDATADB_SUCCEED,
                            payload: dataObj
                        }
                    })
                    .catch(err => {
                        console.log('err: ', err)
                        return Observable.of({ type: actionTypes.LOAD_DATA_FAIL, payload: err.message });
                    })
            })
    }

}

function randomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}