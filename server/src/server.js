const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")

const notifications = require("./notifications.json")

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
    res.send(notifications);
});

app.get('/:id', function (req, res) {
    const id = req.params.id;
    const notification = notifications.find(notification => notification.id === parseInt(id));
    if (notification) {
        res.send(notification)
    } else {
        res.status(404).send()
    }

});

app.post('/notifications', function (req, res) {
    const newNotification = req.body;
    notifications.push(newNotification);
    res.status(201).send(newNotification);
});

app.delete('/notifications/:id', function (req, res) {
    const id = req.params.id;
    const index = notifications.findIndex(notification => notification.id === parseInt(id));
    if (index >= 0) {
        notifications.splice(index, 1);
        res.status(204).send()
    } else {
        res.status(404).send()
    }
});

app.listen(8080, () => console.log('server started at port 8080'));