const express = require('express');
const path = require('path');
let cors = require('cors')
const bodyParser = require('body-parser');
const logger = require('morgan');
const SaveData = require('./controller/SaveData');
const DeleteData = require('./controller/DeleteData');
const FindData = require('./controller/LoadAndFindData');
const UpdateData = require('./controller/UpdateData');

const app = express();
app.use(cors());
app.set('port', 3005 || process.env.PORT);
app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/static', express.static(__dirname + '/build/static'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
})


app.post('/addManyUsers', (req, res) => {
    // console.log('from Many Users: ', req.body)
    SaveData.insertManyUsers(req, res);
});

app.post('/addManyLockers', (req, res) => {
    console.log('all lockers: ', req.body.membersArray);
    SaveData.insertManyLockers(req, res);
})

app.post('/addUser', (req, res) => {
    SaveData.addUser(req, res);
});

app.post('/addLocker', (req, res) => {
    SaveData.addLocker(req, res);
});

app.post('/addInventory', (req, res) => {
    SaveData.addInventory(req, res);
});

app.post(`/deletelocker/:id`, (req, res) => {
    console.log('req.param: ', req.params);
    let { id } = req.params;
    DeleteData.deleteLocker(req, res, id);
});

app.post(`/deleteinventory/:id`, (req, res) => {
    console.log('req.param: ', req.params);
    let { id } = req.params;
    DeleteData.deleteInventory(req, res, id);
});

app.post(`/deleteuser/:id`, (req, res) => {
    console.log('req.param: ', req.params);
    let { id } = req.params;
    DeleteData.deleteUser(req, res, id);
});

app.post('/updateinventory', (req, res) => {
    if (Object.keys(req.body).length == 0) {
        return res.status(400).json({ message: 'Empty object found {}' });
    }
    UpdateData.updateInventory(req, res);
})

app.post('/updateuser', (req, res) => {
    if (Object.keys(req.body).length == 0) {
        return res.status(400).json({ message: 'Empty object found {}' });
    }
    UpdateData.updateUser(req, res);
})

app.post('/updatelocker', (req, res) => {
    if (Object.keys(req.body).length == 0) {
        return res.status(400).json({ message: 'Empty object found {}' });
    }
    UpdateData.updateLocker(req, res);
})

app.post('/getinventory', (req, res) => {
    FindData.getInventory(req, res);
});

app.post('/getusers', (req, res) => {
    FindData.getUsers(req, res);
});

app.post('/getlockers', (req, res) => {
    FindData.getLocker(req, res);
});

app.post('/gethistorylocker', (req, res) => {
    FindData.getHistoryLocker(req, res);
});

app.post('/gethistoryuser', (req, res) => {
    FindData.getHistoryUser(req, res);
});

app.post('/addHistorylocker', (req, res) => {
    SaveData.addHistoryLocker(req, res);
});

app.post('/addHistoryuser', (req, res) => {
    SaveData.addHistoryUser(req, res);
});

app.post('/addlastsync', (req, res) => {
    SaveData.addLastSync(req, res);
});

app.post('/getlastsync', (req, res) => {
    FindData.getLastSync(req, res);
})

app.listen(app.get('port'), () => {
    console.log('server is running on server 8080');
});