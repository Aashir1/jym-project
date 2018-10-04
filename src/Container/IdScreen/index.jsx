import React, { Component } from 'react';
import { connect } from 'react-redux';
import Serivce from '../../Service';
import DBActions from '../../store/action/DBActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import firebase from '../../store/Firebase/firebase';
import HttpService from '../../Services/http';
let state = Serivce.state;
class IdScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: "",
            isRFID: false,
            localDB: this.props.localDBFlag,
        }
        localStorage.setItem('isRFID', JSON.stringify(false));
        // this.timer = setInterval(function () {
        //     console.log('now function loaded');
        //     chrome.nfc.read(device, { timeout: 1000 }, function (type, ndef) {
        //         if (!!type && !!ndef) {
        //             console.log('Type: ', type);
        //             console.log('Indef: ', ndef)
        //         }
        //     });
        // }, 1000);
        // firebase.database().ref('/dataObj').once('value', snapshot => {
        //     console.log('firebase Data:/*/**/*/*/*/*/*/*/*/*/*/ ', Object.keys(snapshot.val()), snapshot.val());

        //     localStorage.setItem('tempObj', JSON.stringify(snapshot.val()));

        // })
    }
    componentDidMount() {
        if (this.props.localDBFlag) {
            this.props.loadLocalDBData();
        }

        // let dataObj = this.props.dataObj, memArray = [];
        // let fbDataObj = JSON.parse(localStorage.getItem('tempObj'));
        // let dataObjKeys = Object.keys(dataObj);
        // let fbDataObjKeys = Object.keys(fbDataObj);
        // console.log('dataObjKeys: ', Object.keys(dataObj));
        // console.log('firebaseDataObjKeys: ', Object.keys(fbDataObj));
        // for (let i in fbDataObj) {
        //     let obj = {}
        // if (fbDataObj[i].type == 'locker') {
        //     obj = fbDataObj[i];
        //     obj['current'] = {
        //         checkDate: fbDataObj[i].current.checkDate || "",
        //         checkout: fbDataObj[i].current.checkout || "",
        //         uid: fbDataObj[i].current.uid || "",
        //         product: fbDataObj[i].current.product || []
        //     }
        //     memArray.push(obj);
        // }
        // if (fbDataObj[i].type == 'member') {
        //     obj = fbDataObj[i];
        //     let nameArray = obj.name.split(' ');
        //     if (obj.lastname && obj.firstname) {
        //         obj['firstName'] = obj.firstname;
        //         obj['lastName'] = obj.lastname;
        //         delete obj.firstname;
        //         delete obj.lastname;
        //     } else {
        //         obj['firstName'] = nameArray[0];
        //         obj['lastName'] = nameArray[1];
        //     }
        //     obj['current'] = {
        //         assignDate: fbDataObj[i].current.assignDate || "",
        //         checkoutDate: fbDataObj[i].current.checkoutDate || "",
        //         lockerId: fbDataObj[i].current.lockerId || "",
        //         uid: fbDataObj[i].current.uid || "",
        //         product: fbDataObj[i].current.product || []
        //     }
        //     memArray.push(obj);
        // fbDataObj['firstName'] = fbDataObj
        // delete fbDataObj[i].firstname;
        // delete fbDataObj[i].lastname;
        // }
        // }
        // HttpService.post('http://192.168.100.19:3005/addManyUsers', { membersArray: memArray });
        //     .pluck('response')
        //     .map(data => {
        //         console.log('bulk users Added');
        //     })
        //     .catch(err => {
        //         console.log('error: ', err);
        //     })
        // }
        // this.props.addManyUsers({ membersArray: memArray });
        // console.log('membersArray: ', memArray);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    onSubmit = (e) => {
        e.preventDefault();
        let { data, userInput, isRFID } = this.state;
        let { dataObj, inventory, currentUser } = this.props;
        let flag = false, currUser = {}, isCheckOut = false, isFound = true;
        userInput = userInput.toString().trim();
        console.log('userInput: ', userInput);
        console.log('dataObj[userInput]: ', dataObj[userInput]);
        if (userInput.trim() !== "") {
            if (isRFID == false) {
                if (dataObj[userInput]) {
                    if (dataObj[userInput].type == 'locker') {
                        data = dataObj[userInput];
                    }
                    if (dataObj[userInput].type == 'member') {
                        for (let i in dataObj) {
                            if (dataObj[i].member_id == userInput) {
                                console.log('member Id find: ', dataObj[i]);
                                data = dataObj[i];
                                isFound = false;
                                break;
                            }
                        }
                    }
                } else {
                    console.log('userInput when rfid false', dataObj[userInput])
                    for (let i in dataObj) {
                        if (dataObj[i].member_id == userInput) {
                            console.log('member Id find: ', dataObj[i]);
                            data = dataObj[i];
                            isFound = false;
                            break;
                        }
                    }
                }
            } else {
                console.log('userInput', userInput)
                console.log('for rfid: ', dataObj[userInput])
                data = dataObj[userInput];
                isFound = false;
            }
            console.log('before if logic: ', data);
            if (data) {
                if (data.type == 'member') {
                    let currentUser = {
                        rfid_tag: data.rfid_tag,
                        name: data.name,
                        imageUrl: data.imageUrl,
                        current: {
                            checkDate: '',
                            assignDate: '',
                            product: [],
                            lockerId: "",
                            checkoutDate: "",
                            uid: ""
                        },
                        userData: [],
                        lockerId: ''
                    }
                    this.props.setCurrentUser(currentUser);
                    this.props.history.replace('home');
                }
                if (data.type == 'locker' && dataObj[dataObj[userInput].current.uid]) {

                    let getLockerCurrentInfo = dataObj[userInput].current;
                    let getUserCurrentInfo = dataObj[dataObj[userInput].current.uid].current;
                    let historyObjUser = {}, historyObjLocker = {}, obj = {};
                    // let lockerHistory = dataObj[userInput].history;
                    // let userInfoHistory = [];

                    //to validate locker assigned or not to the user
                    if (!dataObj[userInput].current.uid) {
                        this.setState({ userInput: '' })
                        alert('this locker is empty');
                        return;
                    }
                    console.log('HHHHHHHHHHHHHHHHHHistory ObjUser: ', getUserCurrentInfo);
                    console.log('HHHHHHHHHHHHHHHHHHistory ObjLocker: ', getLockerCurrentInfo);
                    historyObjUser = Object.assign({}, getLockerCurrentInfo, { checkDate: getUserCurrentInfo.assignDate, assignDate: getUserCurrentInfo.assignDate, checkoutDate: Date.now(), checkout: 'done' });
                    historyObjLocker = Object.assign({}, getUserCurrentInfo, { checkoutDate: Date.now(), checkout: 'done' });


                    obj = {
                        historyObjUser,
                        historyObjLocker,
                        memberId: dataObj[userInput].current.uid,
                        lockerId: dataObj[userInput].rfid_tag
                    }
                    obj.historyObjLocker['uid'] = obj.historyObjUser.uid;
                    obj.historyObjUser['lockerId'] = obj.historyObjLocker.lockerId;

                    if (getLockerCurrentInfo.uid) {
                        if (getLockerCurrentInfo.product) {
                            getLockerCurrentInfo.product.forEach((data, i) => {
                                console.log(data);
                                if (!data.consumeable) {//start from there
                                    if (inventory[data.rfid_tag]) {
                                        inventory[data.rfid_tag].qty = parseInt(inventory[data.rfid_tag].qty);
                                        inventory[data.rfid_tag].qty += data.qty;
                                        this.props.updateInventory({ id: inventory[data.rfid_tag].id, data: inventory[data.rfid_tag] });
                                    }
                                }
                            })
                        }
                        alert(" Checkout of " + dataObj[userInput].name + " is Done");
                        dataObj[dataObj[userInput].current.uid].current = { lockerId: '', product: [], assignDate: "", checkoutDate: "" }
                        dataObj[userInput].isAvailable = true;
                        currentUser = null;
                        this.props.setCurrentUser(null);
                        this.setState({ userInput: '' });
                    }
                    if (this.props.localDBFlag) {//if localDB
                        this.props.updateUser({ id: dataObj[dataObj[userInput].current.uid].id, data: dataObj[dataObj[userInput].current.uid] });
                        dataObj[userInput].current = { uid: '', product: [], checkDate: "", checkout: "" };
                        this.props.updateLocker({ id: dataObj[userInput].id, data: dataObj[userInput] });
                        this.props.addHistoryLocker(obj.historyObjLocker);
                        this.props.addHistoryUser(obj.historyObjUser);
                    }
                    if (!this.props.localDBFlag) {//if firebaseDB
                        dataObj[userInput].current = { uid: '', product: [], checkDate: "", checkout: "" };
                        this.props.setInventory(inventory);
                        this.props.setDataObj(dataObj);
                        this.props.pushHistory(obj);
                    }

                    // const pushId = firebase.database().ref(`member-history/${memberId}/`).push().key

                    // var multipath = {};
                    // multipath[`member-history/${memberId}/${pushId}`] = {}
                    // multipath[`locker-history/${lockerId}/${pushId}`] = {}

                    // firebase.database().ref('/').update(multipath);
                }
            } else {
                this.setState({ userInput: '' });
                alert('wrong entry')
            }
        }
    }

    syncData = () => {
        console.log('lastSync: ', this.props.lastSync);
        let { dataObj } = this.props, tempArray = [];
        console.log('existed find: ', dataObj['12289373']);
        for (let i in dataObj) {
            if (dataObj[i].type === 'member') {
                tempArray.push(dataObj[i].member_id);

            }
        }
        localStorage.setItem('tempArray', JSON.stringify(tempArray));
        if (this.props.lastSync)
            this.props.syncData(this.props.lastSync)
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        localStorage.setItem('isRFID', JSON.stringify(event.target.value));
        console.log(event.target.value)
    };
    handleToggle = name => event => {
        this.setState({ [name]: event.target.checked }, () => {
            // this.props.setLocalDBFlag(this.state.localDB);
            // if (this.state.localDB) {
            //     this.props.loadLocalDBData();
            // }
        });
    };
    render() {




        if (this.props.loadDataIsProgress) {
            return (
                <div style={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div>
                        <CircularProgress thickness={7} size={50} />
                        <div>Loading....</div>
                    </div>
                </div>
            )
        }
        return (
            <div className="App" style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#ecf0f1'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <button className="btn"
                            onClick={this.syncData}
                            style={{
                                width: '15vw',
                                height: '50px',
                                backgroundColor: '#34495e',
                                color: '#ecf0f1',
                                border: '1px solid #ecf0f1',
                                marginTop: '10px',
                                borderRadius: '5px',
                                outline: 'none',
                                marginRight: '3vw',
                                cursor: 'pointer',
                                fontSize: '15px',
                                marginLeft: '3vw'
                            }}>
                            Sync
                    </button>
                    </div>
                    <div style={{
                        width: '50vw',
                        height: '10%',
                        display: 'flex',
                        justifyContent: 'flex-end',

                    }}>
                        <button className="btn"
                            onClick={() => this.props.history.push('/products')}
                            style={{
                                width: '20vw',
                                height: '50px',
                                backgroundColor: '#34495e',
                                color: '#ecf0f1',
                                border: '1px solid #ecf0f1',
                                marginTop: '10px',
                                borderRadius: '5px',
                                outline: 'none',
                                marginRight: '3vw',
                                cursor: 'pointer',
                                fontSize: '15px'
                            }}>
                            Products
                    </button>
                        <button className="btn"
                            onClick={() => this.props.history.push('/lockers')}
                            style={{
                                width: '20vw',
                                height: '50px',
                                backgroundColor: '#34495e',
                                color: '#ecf0f1',
                                border: '1px solid #ecf0f1',
                                marginTop: '10px',
                                borderRadius: '5px',
                                outline: 'none',
                                marginRight: '3vw',
                                cursor: 'pointer',
                                fontSize: '15px'
                            }}>
                            Lockers
                    </button>
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    height: '10%',
                    paddingLeft: '4%'
                }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.localDB}
                                onChange={this.handleToggle('localDB')}
                                value="localDB"
                                color="default"
                            />
                        }
                        label="LocalDB"
                    />
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80%'
                }}>
                    <form onSubmit={this.onSubmit} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <div>
                            <input
                                autoFocus
                                className="input"
                                placeholder={'Enter Your ID'}
                                style={{
                                    width: '30vw',
                                    height: '40px',
                                    fontSize: '20px',
                                    padding: '10px',
                                    color: '#2c3e50'
                                }}
                                value={this.state.userInput}
                                onChange={(e) => this.setState({ userInput: e.target.value })}
                                onKeyPress={this.keyPress} />
                        </div>
                        <div >
                            <Select
                                style={{
                                    width: '20vw',
                                    height: '40px',
                                    marginTop: '10px'
                                }}
                                name='isRFID'
                                value={this.state.isRFID}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'isRFID',
                                }}
                            >
                                <MenuItem key={1} value={true}>RFID_TAG</MenuItem>
                                <MenuItem key={2} value={false}>Member ID</MenuItem>
                            </Select>
                        </div>
                    </form>
                </div>
            </div >
        );
    }
}

let mapStateToProps = (state) => {
    console.log(state);
    return {
        loadDataIsProgress: state.dbReducer.loadDataIsProgress,
        dataObj: state.dbReducer.dataObj,
        inventory: state.dbReducer.inventory,
        currentUser: state.dbReducer.currentUser,
        lockerHistory: state.dbReducer.lockerHistory,
        usersHistory: state.dbReducer.usersHistory,
        lastSync: state.dbReducer.lastSync,
        localDBFlag: state.dbReducer.localDBFlag
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        // loadData: (obj) => dispatch(DBActions.loadData(obj)),
        setCurrentUser: (obj) => dispatch(DBActions.setCurrentUser(obj)),
        setDataObj: (obj) => dispatch(DBActions.setDataObj(obj)),
        setInventory: (obj) => dispatch(DBActions.setInventory(obj)),
        pushHistory: (obj) => dispatch(DBActions.pushHistory(obj)),
        syncData: (lastSync) => dispatch(DBActions.syncData(lastSync)),
        setLocalDBFlag: (flag) => dispatch(DBActions.setLocalDBFlag(flag)),
        loadLocalDBData: () => dispatch(DBActions.loadLocalDBData()),
        updateInventory: (obj) => dispatch(DBActions.updateInventory(obj)),
        updateUser: (obj) => dispatch(DBActions.updateUser(obj)),
        updateLocker: (obj) => dispatch(DBActions.updateLocker(obj)),
        addHistoryUser: (obj) => dispatch(DBActions.addHistoryUser(obj)),
        addHistoryLocker: (obj) => dispatch(DBActions.addHistoryLocker(obj)),
        addManyUsers: (obj) => dispatch(DBActions.addManyUsers(obj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdScreen);