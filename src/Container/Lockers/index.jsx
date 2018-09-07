import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../Components/Navbar';
import Service from '../../Service';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DBActions from '../../store/action/DBActions';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import './index.css';
let state = Service.state;

const styles = {
    tableDiv: {
        display: 'flex',
        width: '60vw',
        justifyContent: 'space-between',
        paddingTop: '13px',
        paddingBottom: '13px'
    },
    tableParent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}
class Lockers extends Component {
    constructor(props) {
        super(props);
        this.lockersArray = [];
        // for (let i in state.lockers) {
        //     console.log(i);
        //     this.lockersArray.push({ key: i, data: state.lockers[i] });
        // }
        let { dataObj, inventory, currentUser } = this.props;
        this.lockers = {};
        for (let i in dataObj) {
            if (dataObj[i].type == 'locker') {
                this.lockers[i] = dataObj[i];
            }
        }
        if (dataObj) {
            this.lockersArray = Object.values(dataObj).filter((data) => data.type == 'locker');
        }

        this.state = {
            lockersArray: this.lockersArray,
            currentUser: currentUser,
            lockerName: '',
            lockers: this.lockers,
            lockerID: ''
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            let { dataObj, inventory, currentUser } = nextProps;
            let lockersArray = [];
            this.lockers = {};
            for (let i in dataObj) {
                if (dataObj[i].type == 'locker') {
                    this.lockers[i] = dataObj[i];
                }
            }
            if (dataObj) {
                lockersArray = Object.values(dataObj).filter((data) => data.type == 'locker');
            }
            this.setState({ lockersArray: lockersArray, lockers: this.lockers });
        }
    }
    addLocker = () => {
        let enterkey = prompt('Enter Your key: ');
        if (enterkey === this.props.privateKey) {
            let { lockerName, lockers, lockerID } = this.state;
            let { dataObj, currentUser, inventory } = this.props;

            // lockerID = Number(lockerID);
            let flag = false;
            if (lockerName.trim() !== "") {
                //tackle this when working on creating lockers
                let lockerArray = Object.keys(lockers);
                for (let i in lockers) {
                    lockerName = lockerName.charAt(0).toUpperCase() + lockerName.slice(1).toLowerCase();
                    if (lockers[i].name == lockerName || dataObj[lockerID] !== undefined) {
                        // console.log('lockerName: ', lockers[i].name);
                        // console.log('dataobj[lockerID]: ', dataObj[lockerID]);
                        alert('Locker Already Exist');
                        flag = true;
                        return;
                    }
                }
                if (!flag) {
                    lockerName = lockerName.charAt(0).toUpperCase() + lockerName.slice(1).toLowerCase();
                    dataObj[lockerID] = {
                        type: 'locker', name: lockerName, rfid_tag: lockerID, current: { checkDate: "", checkout: "", uid: "" }, isAvailable: true
                    };
                    if (this.props.localDBFlag) {
                        this.props.addLocker(dataObj[lockerID]);
                        this.setState({ lockerID: '', lockerName: '' });
                    }
                    if (!this.props.localDBFlag) {
                        this.props.setDataObj(dataObj);
                        this.setState({ lockerID: '', lockerName: '', lockersArray: [...this.state.lockersArray, { type: 'locker', name: lockerName, rfid_tag: lockerID, current: { checkDate: "", checkout: "", uid: "" }, history: [], isAvailable: true }] }, () => {
                            console.log('lockers Array', this.state.lockersArray)
                        });
                    }
                }
            } else {
                alert('Data Badly formated')
            }
            console.log(state.lockers);
        }
    }


    deleteItem = (id, databaseId = undefined) => {
        let enterkey = prompt('Enter your key: ');
        if (enterkey === this.props.privateKey) {
            if (this.props.localDBFlag) {
                this.props.deleteLocker(databaseId);
            }
            if (!this.props.localDBFlag) {
                console.log('its work');
                this.props.deleteItem({ cal: 'locker', id });
            }
        }
    }
    render() {
        console.log('state: ', state.inventory);
        let { dataObj, currentUser, inventory } = this.props;
        return (
            <Navbar history={this.props.history} history={this.props.history} name={currentUser ? this.state.currentUser.name : 'UserName'} imageUrl={currentUser ? this.state.currentUser.imageUrl : null}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',

                }}>
                    <div>
                        <div>
                            <TextField
                                label="Locker Name"
                                value={this.state.lockerName}
                                onChange={(text) => this.setState({ lockerName: text.target.value })}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Locker ID"
                                type='number'
                                value={this.state.lockerID}
                                onChange={(text) => this.setState({ lockerID: text.target.value })}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <Button onClick={this.addLocker} variant="contained" color="primary" style={{ width: '100%', marginTop: '10px' }}>
                                Add Locker
                            </Button>
                        </div>
                    </div>

                    <h1>Lockers</h1>
                    <div style={{
                        width: '75vw',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around'
                    }}>
                        {
                            this.state.lockersArray.map((data, i) => {
                                // let { data, key } = dataObj;
                                console.log('locker info Obj: ', data);
                                if (data !== undefined)
                                    return (
                                        <div key={i} className="locker-item" style={
                                            {
                                                width: '25%',
                                                backgroundColor: data.isAvailable ? '#2ecc71' : '#e74c3c',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: '5px',
                                                paddingTop: '15px',
                                                marginTop: '15px',
                                                marginLeft: '10px',
                                                marginRight: '10px',
                                                minWidth: '101px'
                                            }
                                        }>
                                            {
                                                data.isAvailable == false ?
                                                    <div style={{
                                                        textAlign: 'center',
                                                        marginBottom: '7px'
                                                    }}>
                                                        {`Alocated to: ${dataObj[dataObj[data.rfid_tag].current.uid].name}`}
                                                    </div>
                                                    : null
                                            }
                                            <div style={{ display: 'flex' }}>
                                                <div style={{ textAlign: 'center' }}>
                                                    <div>
                                                        <p>
                                                            {`NAME: ${data.name}`}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p>
                                                            {`ID: ${data.rfid_tag}`}
                                                        </p>

                                                    </div>
                                                    <div>
                                                        {
                                                            data.isAvailable ?
                                                                <p>Available</p>
                                                                :
                                                                <p>Not Available</p>
                                                        }
                                                    </div>
                                                </div>
                                                <div style={{

                                                }}>
                                                    <IconButton >
                                                        {
                                                            this.props.localDBFlag ?
                                                                <Delete style={{ cursor: 'pointer', color: '#c0392b' }} onClick={() => this.deleteItem(data.rfid_tag, data.id)} />
                                                                :
                                                                <Delete style={{ cursor: 'pointer', color: '#c0392b' }} onClick={() => this.deleteItem(data.rfid_tag)} />
                                                        }
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </div>
                                    )
                            })
                        }
                    </div>
                </div>
            </Navbar >
        );
    }
}

let mapStateToProps = (state) => {
    console.log(state);
    return {
        state,
        dataObj: state.dbReducer.dataObj,
        inventory: state.dbReducer.inventory,
        currentUser: state.dbReducer.currentUser,
        localDBFlag: state.dbReducer.localDBFlag,
        privateKey: state.dbReducer.privateKey
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        setCurrentUser: (obj) => dispatch(DBActions.setCurrentUser(obj)),
        setDataObj: (obj) => dispatch(DBActions.setDataObj(obj)),
        setInventory: (obj) => dispatch(DBActions.setInventory(obj)),
        deleteItem: (id) => dispatch(DBActions.deleteItem(id)),
        addLocker: (obj) => dispatch(DBActions.addLocker(obj)),
        deleteLocker: (id) => dispatch(DBActions.deleteLocker(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lockers);