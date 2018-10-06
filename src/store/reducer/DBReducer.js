import actionTypes from '../actionTypes';

let intialState = {
    loadDataIsProgress: false,
    setDataObjIsProgress: false,
    setInventoryIsProgress: false,
    pushHistoryIsProgress: false,
    dataObj: {},
    inventory: {},
    errorMessage: '',
    currentUser: null,
    pushHistoryData: [],
    lastSync: '',
    localDBFlag: true,
    addUserProgress: false,
    privateKey: 'abc123'
}

function DBReducer(state = intialState, action) {
    switch (action.type) {
        case actionTypes.LOAD_DATA_PROGRESS:
            return Object.assign({}, state, { loadDataIsProgress: true });
        case actionTypes.LOAD_DATA_SUCCEED:
            return Object.assign({}, state, { loadDataIsProgress: false, dataObj: action.payload && action.payload.dataObj || {}, inventory: action.payload && action.payload.inventory || {}, lastSync: action.payload.lastSync });
        case actionTypes.LOAD_DATA_FAIL:
            return Object.assign({}, state, { loadDataIsProgress: false, errorMessage: action.payload });


        case actionTypes.SET_CURRENTUSER_PROGRESS:
            return Object.assign({}, state, { currentUser: action.payload });


        case actionTypes.SET_DATAOBJ_PROGRESS:
            return Object.assign({}, state, { setDataObjIsProgress: true, dataObj: action.payload });
        case actionTypes.SET_DATAOBJ_SUCCEED:
            return Object.assign({}, state, { setDataObjIsProgress: false });
        case actionTypes.SET_DATAOBJ_FAIL:
            return Object.assign({}, state, { setDataObjIsProgress: false, errorMessage: action.payload });


        case actionTypes.SET_INVENTORY_PROGRESS:
            return Object.assign({}, state, { inventory: action.payload, setInventoryIsProgress: true });
        case actionTypes.SET_INVENTORY_SUCCEED:
            return Object.assign({}, state, { setInventoryIsProgress: false });
        case actionTypes.SET_INVENTORY_FAIL:
            return Object.assign({}, state, { setInventoryIsProgress: false, errorMessage: action.payload });


        case actionTypes.PUSH_HISTORY_PROGRESS:
            return Object.assign({}, state, { pushHistoryIsProgress: true });
        case actionTypes.PUSH_HISTORY_SUCCEED:
            return Object.assign({}, state, { pushHistoryIsProgress: false, pushHistoryData: [...state.pushHistoryData, action.payload] });
        case actionTypes.PUSH_HISTORY_FAIL:
            return Object.assign({}, state, { pushHistoryIsProgress: false, errorMessage: action.payload });


        case actionTypes.SYNC_DATA_PROGRESS:
            return Object.assign({}, state, { loadDataIsProgress: true });
        case actionTypes.SYNC_DATA_SUCCEED:
            const d = { ...state.dataObj, ...action.payload };
            console.log('dddddddddd ', d);
            return Object.assign({}, state, { loadDataIsProgress: false, dataObj: { ...state.dataObj, ...action.payload } });
        case actionTypes.SYNC_DATA_FAIL:
            return Object.assign({}, state, { loadDataIsProgress: false, errorMessage: action.payload });

        case actionTypes.MAKE_LOADER_FALSE:
            return Object.assign({}, state, { loadDataIsProgress: false });


        case actionTypes.DELETE_LOCKER_PROGRESS:
            let { dataObj, inventory } = state;
            if (action.payload.cat == 'inventory') {
                delete dataObj[action.payload.id];
                delete inventory[action.payload.id];
                return Object.assign({}, state, { dataObj, inventory });
            }
            console.log('cloneObj: ', dataObj)
            delete dataObj[action.payload.id];
            return Object.assign({}, state, { dataObj });
        // case actionTypes.DELETE_LOCKER_SUCCEED:
        // return Object.assign({})
        case actionTypes.DELETE_LOCKER_FAIL:
            return Object.assign({}, state, { errorMessage: action.payload });



        case actionTypes.SET_LOCALDB_FLAG:
            return Object.assign({}, state, { localDBFlag: action.payload });


        case actionTypes.LOAD_LOCALDATADB_PROGRESS:
            return Object.assign({}, state, { loadDataIsProgress: true });
        case actionTypes.LOAD_LOCALDATADB_SUCCEED:
            if (typeof action.payload == 'string') {
                return Object.assign({}, state, { lastSync: action.payload });
            }
            return Object.assign({}, state, { loadDataIsProgress: false, dataObj: { ...state.dataObj, ...action.payload } });
        case actionTypes.LOAD_LOCALDATADB_INVENTORY_SUCCEED:
            return Object.assign({}, state, { loadDataIsProgress: false, inventory: { ...state.inventory, ...action.payload }, dataObj: { ...state.dataObj, ...action.payload } });
        case actionTypes.LOAD_LOCALDATADB_FAIL:
            return Object.assign({}, state, { loadDataIsProgress: false, errorMessage: action.payload });



        case actionTypes.ADD_USER_PROGRESS:
            return Object.assign({}, state, { addUserProgress: true });
        case actionTypes.ADD_USER_SUCCEED:
            return Object.assign({}, state, { addUserProgress: false, dataObj: { ...state.dataObj, ...action.payload } });
        case actionTypes.ADD_USER_FAIL:
            return Object.assign({}, state, { addUserProgress: false, errorMessage: action.payload });


        case actionTypes.DELETE_USER_PROGRESS:
            return Object.assign({}, state, { loadDataIsProgress: true });
        case actionTypes.DELETE_USER_SUCCEED:
            let tempObj = state.dataObj;
            console.log('from reducer action.payload: ', action.payload);
            delete tempObj[action.payload.rfid_tag];
            return Object.assign({}, state, { dataObj: tempObj, loadDataIsProgress: false });
        case actionTypes.DELETE_USER_FAIL:
            return Object.assign({}, state, { errorMessage: action.payload, loadDataIsProgress: false });



        case actionTypes.ADD_LOCKER_PROGRESS:
            return Object.assign({}, state, { loadDataIsProgress: true });
        case actionTypes.ADD_LOCKER_SUCCEED:
            return Object.assign({}, state, { dataObj: { ...state.dataObj, ...action.payload }, loadDataIsProgress: false });
        case actionTypes.ADD_LOCKER_FAIL:
            return Object.assign({}, state, { errorMessage: action.payload, loadDataIsProgress: false });


        case actionTypes.DELETE_LOCAL_LOCKER_PROGRESS:
            return Object.assign({}, state, { loadDataIsProgress: true });
        case actionTypes.DELETE_LOCAL_LOCKER_SUCCEED:
            let temObj = state.dataObj;
            console.log('from reducer action.payload/*/*/*/*/*/*/*/*/*/*/: ', action.payload);
            delete temObj[action.payload.rfid_tag];
            return Object.assign({}, state, { loadDataIsProgress: false, dataObj: temObj });
        case actionTypes.DELETE_LOCAL_LOCKER_FAIL:
            return Object.assign({}, state, { loadDataIsProgress: false, errorMessage: action.payload });



        case actionTypes.ADD_INVENTORY_PROGRESS:
            return Object.assign({}, state, { loadDataIsProgress: true });
        case actionTypes.ADD_INVENTORY_SUCCEED:
            return Object.assign({}, state, { loadDataIsProgress: false, dataObj: { ...state.dataObj, ...action.payload }, inventory: { ...state.inventory, ...action.payload } });
        case actionTypes.ADD_INVENTORY_FAIL:
            return Object.assign({}, state, { loadDataIsProgress: false, errorMessage: action.payload });



        case actionTypes.DELETE_INVENTORY_PROGRESS:
            return Object.assign({}, state, { loadDataIsProgress: true });
        case actionTypes.DELETE_INVENTORY_SUCCEED: {
            let { dataObj, inventory } = state;
            delete dataObj[action.payload.rfid_tag];
            delete inventory[action.payload.rfid_tag];
            return Object.assign({}, state, { loadDataIsProgress: false, dataObj, inventory });
        }
        case actionTypes.DELETE_INVENTORY_FAIL:
            return Object.assign({}, state, { loadDataIsProgress: false, errorMessage: action.payload });


        case actionTypes.UPDATE_INVENTORY_PROGRESS:
            return Object.assign({}, state, { loadDataIsProgress: true });
        case actionTypes.UPDATE_INVENTORY_SUCCEED:
            return Object.assign({}, state, { dataObj: { ...state.dataObj, ...action.payload }, inventory: { ...state.inventory, ...action.payload } });
        case actionTypes.UPDATE_INVENTORY_FAIL:
            return Object.assign({}, state, { loadDataIsProgress: false, errorMessage: action.payload });


        case actionTypes.UPDATE_USER_PROGRESS:
            return Object.assign({}, state, { loadDataIsProgress: true });
        case actionTypes.UPDATE_USER_SUCCEED:
            return Object.assign({}, state, { loadDataIsProgress: false, dataObj: { ...state.dataObj, ...action.payload } });
        case actionTypes.UPDATE_USER_FAIL:
            return Object.assign({}, state, { loadDataIsProgress: false, errorMessage: action.payload });


        case actionTypes.UPDATE_LOCKER_PROGRESS:
            return Object.assign({}, state, { loadDataIsProgress: true });
        case actionTypes.UPDATE_LOCKER_SUCCEED:
            return Object.assign({}, state, { loadDataIsProgress: false, dataObj: { ...state.dataObj, ...action.payload } });
        case actionTypes.UPDATE_LOCKER_FAIL:
            return Object.assign({}, state, { loadDataIsProgress: false, errorMessage: action.payload });

        default:
            return state;
    }
}

export default DBReducer;