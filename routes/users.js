const express = require('express');
const router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


// -- Register
router.post('/register', (req, res, next) => {
    //res.send('REGISTER');
    console.log('------------register :' + req.body.name);    
    console.log('------------register :' + req.body.email);    
    console.log('------------register :' + req.body.username); 
    console.log('------------register :' + req.body.password); 

    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    console.log('------------newUser :' + newUser);    

    User.addUser(newUser, (err, user) => {
        if(err){
            console.log('**********ERR'); 
            res.json({success: false, msg:`Failed to register user`});
        } else {
            console.log('**********OK'); 
            res.json({success: true, msg:`User registered`});
        }
    })

});

// -- Authenticate
router.post('/authenticate', (req, res, next) => {
    console.log('authenticate :' + req.body.name);    
    // res.send('AUTHENTICATE');
    //res.send('REGISTER');
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {

        if(err){
            res.json({success: false, msg:`Failed to register user`});
        } else {
            res.json({success: true, msg:`User registered`});
        }
    });

});

// -- Profile
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');

});


module.exports = router;
 
