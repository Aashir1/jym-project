import actionTypes from '../actionTypes';


class DBActions {
    static addHistoryUser(obj) {
        return {
            type: actionTypes.ADD_HISTORY_USER_PROGRESS,
            payload: obj
        }
    }
    static addHistoryLocker(obj) {
        return {
            type: actionTypes.ADD_HISTORY_LOCKER_PROGRESS,
            payload: obj
        }
    }
    static updateLocker(obj) {
        return {
            type: actionTypes.UPDATE_LOCKER_PROGRESS,
            payload: obj
        }
    }
    static updateUser(obj) {
        return {
            type: actionTypes.UPDATE_USER_PROGRESS,
            payload: obj
        }
    }
    static updateInventory(obj) {
        return {
            type: actionTypes.UPDATE_INVENTORY_PROGRESS,
            payload: obj
        }
    }
    static deleteInventory(id) {
        return {
            type: actionTypes.DELETE_INVENTORY_PROGRESS,
            payload: id
        }
    }
    static addInventory(obj) {
        return {
            type: actionTypes.ADD_INVENTORY_PROGRESS,
            payload: obj
        }
    }
    static deleteLocker(id) {
        return {
            type: actionTypes.DELETE_LOCAL_LOCKER_PROGRESS,
            payload: id
        }
    }
    static addLocker(obj) {
        return {
            type: actionTypes.ADD_LOCKER_PROGRESS,
            payload: obj
        }
    }
    static deleteUser(id) {
        return {
            type: actionTypes.DELETE_USER_PROGRESS,
            payload: id
        }
    }
    static addUser(obj) {
        return {
            type: actionTypes.ADD_USER_PROGRESS,
            payload: obj
        }
    }
    static loadLocalDBData() {
        return {
            type: actionTypes.LOAD_LOCALDATADB_PROGRESS
        }
    }
    static setLocalDBFlag(flag) {
        return {
            type: actionTypes.SET_LOCALDB_FLAG,
            payload: flag
        }
    }
    static deleteItem(obj) {
        return {
            type: actionTypes.DELETE_LOCKER_PROGRESS,
            payload: obj
        }
    }
    static loadData(obj) {
        return {
            type: actionTypes.LOAD_DATA_PROGRESS,
            payload: obj
        }
    }
    static setDataObj(obj) {
        return {
            type: actionTypes.SET_DATAOBJ_PROGRESS,
            payload: obj
        }
    }
    static setCurrentUser(obj) {
        return {
            type: actionTypes.SET_CURRENTUSER_PROGRESS,
            payload: obj
        }
    }
    static setInventory(obj) {
        return {
            type: actionTypes.SET_INVENTORY_PROGRESS,
            payload: obj
        }
    }
    static pushHistory(obj) {
        return {
            type: actionTypes.PUSH_HISTORY_PROGRESS,
            payload: obj
        }
    }
    static syncData(lastSync) {
        return {
            type: actionTypes.SYNC_DATA_PROGRESS,
            payload: lastSync
        }
    }
}



export default DBActions;