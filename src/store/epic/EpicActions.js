import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import actionTypes from '../actionTypes';
import FirebaseDB from '../Firebase/firebaseDB';
import { ActionsObservable } from 'redux-observable';
import DBActions from '../action/DBActions';
import actionType from '../actionTypes';

export default class EpicActions {

    static loadData($action) {
        return $action.ofType(actionTypes.LOAD_DATA_PROGRESS)
            .switchMap(({ }) => {
                return Observable.fromPromise(FirebaseDB.loadData())
                    .map(data => {
                        console.log("data come from firebase: ", data);
                        return {
                            type: actionType.LOAD_DATA_SUCCEED,
                            payload: data
                        }
                    })
                    .catch((err) => {
                        return Observable.of({ type: actionTypes.LOAD_DATA_FAIL, payload: err.message });
                    })
            })
    }
    static setDataObj($action) {
        return $action.ofType(actionTypes.SET_DATAOBJ_PROGRESS)
            .switchMap(({ payload }) => {
                if(payload)
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

    static syncData(action$) {
        let multipathForStore = {};
        return action$.ofType(actionTypes.SYNC_DATA_PROGRESS)
            .switchMap(({ payload }) => {
                return Observable.ajax({
                    url: `https://api.virtuagym.com/api/v1/club/26147/member?api_key=3fqoM6D9Lbz1ftGPvrMZg9YfFJW9s1noOAeYg3PBkC&club_secret=CS-26147-ACCESS-vrwzgdRxUaPvTcNGkKVgiPoYs&sync_from=[${payload}]`,
                    method: 'GET',
                    async: true,
                    crossDomain: true,
                    responseType: 'json',
                    createXHR: () => new XMLHttpRequest()
                })
                    .pluck('response').map(xdata => {
                        let multipath = {};
                        console.log('xdata: ', xdata);
                        xdata.result.forEach((data, i) => {
                            if (data.rfid_tag) {
                                data['type'] = 'member';
                                data['name'] = `${data.firstname} ${data.lastname}`
                                data[`current`] = { assignDate: "", checkoutDate: "", lockerId: "", product: [] };
                                multipath[`dataObj/${data.rfid_tag}/`] = data;
                                multipathForStore[data.rfid_tag] = data;
                            } else {
                                let id = randomString();
                                data['rfid_tag'] = data.member_id;
                                data['type'] = 'member';
                                data['name'] = `${data.firstname} ${data.lastname}`
                                data[`current`] = { assignDate: "", checkoutDate: "", lockerId: "", product: [] };
                                multipath[`dataObj/${data.member_id}/`] = data;
                                multipathForStore[data.member_id] = data;
                            }
                        })
                        console.log('after forEach: ', multipath);
                        return multipath;
                    }).switchMap((data) => {
                        console.log('data: ', multipathForStore);
                        if(data){
                            return Observable.fromPromise(FirebaseDB.syncDatatoFirebase(data))
                                .map(() => {
                                    return {
                                        type: actionTypes.SYNC_DATA_SUCCEED,
                                        payload: multipathForStore
                                    }
                                });
                        }else{
                            alert('error in data fetching');
                        }
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

}

function randomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}