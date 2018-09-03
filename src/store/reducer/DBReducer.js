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
    localDBFlag: false
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
            return Object.assign({}, state, { loadDataIsProgress: false, dataObj: { ...state.dataObj, ...action.payload } });
        case actionTypes.LOAD_LOCALDATADB_FAIL:
            return Object.assign({}, state, { loadDataIsProgress: false, errorMessage: action.payload });

        default:
            return state;
    }
}

export default DBReducer;