const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// --- User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String 
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    console.log('addUser : ***************1 module.exports.addUser' );    
    console.log(newUser);    
    console.log(callback);    

    bcrypt.genSalt(10, (err, salt) => {

        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            console.log('addUser : hash' + hash );    
            newUser.password = hash;
            newUser.save(callback);
        });

    });
    
    console.log('addUser : ***************2');
}
