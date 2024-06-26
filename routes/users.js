const express = require('express');
const router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')
const User = require('../models/user');

// -----------------------------------------------------
// -- Register
// -----------------------------------------------------
router.post('/register', (req, res, next) => {
    //res.send('REGISTER');
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

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

// -----------------------------------------------------
// -- Authenticate
// -----------------------------------------------------
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            console.log('PASSWORD:' + password);
            console.log('USER PASSWORD:' + user.password);

            if(err) throw err;
            if(isMatch) {
                console.log('********isMatch OK');
                 // 1 week

                const token = jwt.sign({user}, config.secret, {expiresIn: 604800});

                console.log('******** 2');
                return res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        name: user.name, 
                        username: user.username,
                        email: user.email
                    }
                });

            } else {
                console.log('isMatch NO');
                return res.json({success: false, msg: 'Wrong password'});
            }
        });        
    });
});


// -----------------------------------------------------
// --- Profile
// -----------------------------------------------------
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    //res.send('PROFILE');
    //res.json({user: req.user[0]});
    res.json({user: req.user});
});


module.exports = router;
