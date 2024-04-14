const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');


/*
Also, with current version of passport 0.4.0, you need to make following changes to your passport config :
Change ExtractJwt.fromAuthHeaderWithBearer() to ExtractJwt.fromAuthHeaderWithScheme('jwt') and 
User.getUserById(jwt_payload._doc._id, ...) to User.getUserById(jwt_payload._id, ...)

*/
module.exports = function(passport) {
    let opts = {}
    //opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    //opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithBearer();

    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

        User.getUserById(jwt_payload._id, (err, user) => {
        //User.getUserById(jwt_payload._doc._id, (err, user) => {
            if(err) {
                return done(err,false);
            }
            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });

    }));

}