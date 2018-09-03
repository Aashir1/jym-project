import actionTypes from '../actionTypes';


class DBActions {
    static  loadLocalDBData(){
        return{
            type: actionTypes.LOAD_LOCALDATADB_PROGRESS
        }
    }
    static setLocalDBFlag(flag){
        return{
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
    static loadData() {
        return {
            type: actionTypes.LOAD_DATA_PROGRESS
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