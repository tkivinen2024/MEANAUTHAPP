
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
<<<<<<< HEAD

// --- Connect to Database
mongoose.connect(config.database);

// --- On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database)  
})

// --- On Error
mongoose.connection.on('error', (err) => {
    console.log('Database Error: ' + config.database)  
  })


const app = express();

=======

// --- Connect to Database
mongoose.connect(config.database);

// --- On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database)  
})

// --- On Error
mongoose.connection.on('error', (err) => {
    console.log('Database Error: ' + config.database)  
  })

  
const app = express();
>>>>>>> 1afe380e2832bfe52e9006804889a547b2913f9b
const users = require('./routes/users');

// --- Port Number
const port = 3000;

// --- CORS Middleware
app.use(cors());

// --- Set static folder
app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< HEAD
=======

>>>>>>> 1afe380e2832bfe52e9006804889a547b2913f9b
// --- Body Parser Middleware
app.use(bodyParser.json());

app.use('/users', users);

// --- Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
<<<<<<< HEAD
});

// --- Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
=======
>>>>>>> 1afe380e2832bfe52e9006804889a547b2913f9b
});

/// --- Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});


