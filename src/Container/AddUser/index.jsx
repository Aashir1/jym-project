import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../Components/Navbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DBActions from '../../store/action/DBActions';
import Service from '../../Service';
import Delete from '@material-ui/icons/Delete';
let { state } = Service;
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
class AddUser extends Component {
    constructor(props) {
        super(props);
        let { dataObj, inventory, currentUser } = this.props;
        this.allUsers = [];
        for (let i in dataObj) {
            if (dataObj[i].type == 'member') {
                this.allUsers.push(dataObj[i]);
            }
        }
        console.log('inside Constructor: ', this.allUsers.slice(0, 50));
        this.state = {
            firstName: '',
            lastName: '',
            imageUrl: null,
            rfid_tag: '',
            currentUser,
            member_id: '',
            arrayLength: 50,
            allUsers: this.allUsers.slice(0, 50),
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.callPaging);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.callPaging);
    }
    callPaging = () => {
        let scrollTop = document.documentElement.scrollTop;
        let scrollHeight = document.documentElement.scrollHeight;
        let offsetHeight = document.documentElement.clientHeight;
        let contentHeight = scrollHeight - offsetHeight;
        if (contentHeight <= scrollTop) {
            if (this.allUsers.slice(this.state.arrayLength + 30).indexOf(undefined) == -1) {
                this.setState({ allUsers: this.state.allUsers.concat(this.allUsers.slice(this.state.arrayLength, this.state.arrayLength + 30)), arrayLength: this.state.arrayLength + 30 });
            } else {
                let lastDataIndex = this.allUsers.slice(this.state.arrayLength + 30).indexOf(undefined);
                let sliceArray = this.allUsers.slice(this.state.arrayLength, lastDataIndex);
                this.setState({ allUsers: [...this.state.allUsers, sliceArray] });

            }
        }
    }
    componentWillReceiveProps(nextProps) {
        // console.log('componentWillrecive: ', nextProps);
        let { dataObj, inventory, currentUser } = nextProps;
        let allUsers = [];
        if (this.props !== nextProps) {
            for (let i in dataObj) {
                if (dataObj[i].type == 'member') {
                    console.log(' incomponentWillrecive dataObj[i]: ', dataObj[i]);
                    allUsers.push(dataObj[i]);
                }
            }
            this.setState({ allUsers: allUsers.slice(0, this.state.arrayLength) });
        }
    }
    addUser = () => {
        let enterKey = prompt('Enter Your key: ');
        if (enterKey === this.props.privateKey) {
            let { dataObj, inventory, currentUser, localDBFlag } = this.props;
            let { firstName, lastName, rfid_tag, imageUrl, member_id } = this.state;
            if (firstName.trim() !== '' && lastName.trim() !== '' && rfid_tag.trim() !== '') {
                if (dataObj[rfid_tag] == undefined) {
                    dataObj[rfid_tag] = {
                        type: 'member',
                        firstName,
                        lastName,
                        name: `${firstName} ${lastName}`,
                        rfid_tag: rfid_tag,
                        member_id: member_id.trim() == "" ? rfid_tag : member_id,
                        imageUrl: null,
                        current: { lockerId: '', product: [], assignData: "", checkoutDate: "", uid: '' },
                    }
                    //localDBFlag
                    if (localDBFlag) {
                        this.props.addUser(dataObj[rfid_tag]);
                        this.setState({ firstName: '', lastName: '', rfid_tag: '', imageUrl: null, member_id: '' })
                    }
                    if (!localDBFlag) {
                        this.props.setDataObj(dataObj);
                        this.setState({ allUsers: [...this.state.allUsers, dataObj[rfid_tag]], firstName: '', lastName: '', rfid_tag: '', imageUrl: null, member_id: '' }, () => {
                            console.log('this.state.allUsers after adding: ', this.state.allUsers);
                        })
                    }
                    console.log('this.state.allUsers before adding: ', this.state.allUsers);
                } else {
                    alert('This ID already in use');
                }
            } else {
                alert('data badly formated');
            }
        }
        this.setState({ firstName: '', lastName: '', rfid_tag: '', imageUrl: null, member_id: '' });
        enterKey = "";
    }

    deleteItem = (id, databaseId = undefined) => {
        let enterKey = prompt('Enter Your key: ');
        console.log('from deleteItem func id: ', id);
        console.log('from deleteItem func databaseid: ', databaseId);
        if (enterKey === this.props.privateKey) {
            if (this.props.localDBFlag && databaseId) {
                this.props.deleteUser(databaseId)
            }
            if (!this.props.localDBFlag) {
                this.props.deleteItem({ cat: 'user', id })
            }
        }
    }

    render() {
        let { dataObj, inventory, currentUser } = this.props;
        console.log('this.state.allUsers: ', this.state.allUsers);
        return (
            <Navbar style={styles.tableParent} history={this.props.history} name={currentUser ? this.state.currentUser.name : 'UserName'} imageUrl={currentUser ? this.state.currentUser.imageUrl : null}>
                <div style={styles.tableParent}>
                    <div>
                        <div>
                            <TextField
                                label="First Name"
                                value={this.state.firstName}
                                onChange={(text) => this.setState({ firstName: text.target.value })}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Last Name"
                                value={this.state.lastName}
                                onChange={(text) => this.setState({ lastName: text.target.value })}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="rfid_tag"
                                value={this.state.rfid_tag}
                                onChange={(text) => this.setState({ rfid_tag: text.target.value })}                            // onChange={this.handleChange('name')}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="member_id"
                                value={this.state.member_id}
                                onChange={(text) => this.setState({ member_id: text.target.value })}                            // onChange={this.handleChange('name')}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <Button onClick={this.addUser} variant="contained" color="primary" style={{ width: '100%', marginTop: '10px' }}>
                                Add User
                            </Button>
                        </div>
                    </div>

                    <h1 style={{ color: '#34495e' }}>Users</h1>
                    <div style={{
                        display: 'flex',
                        width: '60vw',
                        justifyContent: 'space-between',
                        paddingTop: '13px',
                        paddingBottom: '13px',
                        backgroundColor: '#ecf0f1',
                        color: '#34495e',
                        padding: '15px'
                    }}>
                        <h1 style={{ width: '50%', color: '#34495e' }}>Name</h1>
                        <h1 style={{ width: '50%', color: '#34495e' }}>Member_ID</h1>
                        <h1 style={{ width: '50%', color: '#34495e', textAlign: 'right' }}>RFID_TAG</h1>
                    </div>
                    {
                        this.state.allUsers.map((data, i) => {

                            if (data)
                                return (
                                    <div key={i} style={{
                                        display: 'flex',
                                        width: '60vw',
                                        justifyContent: 'space-between',
                                        paddingTop: '13px',
                                        paddingBottom: '13px',
                                        backgroundColor: i % 2 === 0 ? '#ecf0f1' : '#bdc3c7',
                                        color: '#34495e',
                                        padding: '15px'
                                    }}
                                    >
                                        <div style={{ display: 'flex', alignSelf: 'left', width: '33.3%', alignItems: 'center' }}>
                                            {data.name}
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            width: '33.3%',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            {data.member_id}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '33.3%', }}>
                                            <div>
                                                {data.rfid_tag}
                                            </div>
                                            <div style={{ marginLeft: '15px' }}>
                                                {
                                                    this.props.localDBFlag ?
                                                        <Delete onClick={() => this.deleteItem(data.rfid_tag, data.id)} style={{ cursor: 'pointer', color: '#c0392b' }} />
                                                        :
                                                        <Delete onClick={() => this.deleteItem(data.rfid_tag)} style={{ cursor: 'pointer', color: '#c0392b' }} />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                        })
                    }
                </div>
            </Navbar>
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
        deleteItem: (obj) => dispatch(DBActions.deleteItem(obj)),
        addUser: (obj) => dispatch(DBActions.addUser(obj)),
        deleteUser: (id) => dispatch(DBActions.deleteUser(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);