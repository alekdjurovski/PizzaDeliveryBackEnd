const User = require('../models/user');
const config = require('./config');
const jwt = require('jsonwebtoken'); // Keep user logged in using this library

/* Exports */
module.exports.initializeAdmin = initializeAdmin;
module.exports.checkToken = checkToken;

function initializeAdmin() {
    User.findOne({
        username: config.admin.username
    }).then((data) => {
        if(!data){
            let user = new User(config.admin);
            return user.save();
        }
    }).catch((err) => {
        throw err;
    });
}

function checkToken (req, res, next) {
    const token = req.headers['x-access-token']; // Get from REQUEST or URL or HEADERS

    if (token) {
        // verify a token symmetric
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                res.status(500).send('Token invalid'); // This happens when session is expired
            } else {
                req.user = decoded;                                  //decoded basically takes the token combines with the SECRET, verifies it nad once its good it sends back decoded and sends back username and email
                next();         // Required to leave middleware
            }
        });
    } else {
        res.status(401).send('missing authorization header');
    }
}
//function isLoggedIn(req, res, next) {
//    if (req.isAuthenticated()) {
//        return next();
//    }
//    res.redirect('/');
// }

// function notLoggedIn(req, res, next) {
//    if (!req.isAuthenticated()) {
//        return next();
//    }
//    res.redirect('/');
// }