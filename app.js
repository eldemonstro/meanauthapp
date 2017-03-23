const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connect', () => {
    console.log('Connect to database' + config.database);
});

mongoose.connection.on('err', (err) => {
    console.log('Database err' + err);
});

const app = express();

const users = require('./routes/users');

//Port numver
const port = 3000;

// CORS Middle Ware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser MW
app.use(bodyParser.json());

//Passport MW
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.send("Beautifuils");
});

// Start Server
app.listen(port, () => {
    console.log("Server started on port " + port);
});