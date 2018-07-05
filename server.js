const express = require('express');
const app = express();                                     // (to make the application run)
const port = process.env.PORT || 8080;
const morgan = require('morgan');                             // (HTTP request logger middleware)
const mongoose = require('mongoose');                           // (object data modeling to simplify interactions with MongoDB)
const bodyParser = require('body-parser');// (for parsing incoming requests)
const router = express.Router();                              //  "express.Router() creates an object that behaves similar to the app object."
const userRoutes = require('./app/routes/api')(router);          // requires all the routes from api.js (register user, log in ... )
const ingredientsRoutes = require('./app/routes/ingredientsApi')(router);
const orderRoutes = require('./app/routes/order')(router);
const pizzaRoutes = require('./app/routes/pizzaApi')(router);
const customRoutes = require('./app/routes/customApi')(router);
const path = require('path');                              // The path module provides utilities for working with file and directory paths.
const passport = require('passport');                              // Passport is authentication middleware for Node.js. support authentication using a username and password, Facebook, Twitter, and more.
const social = require('./app/passport/passport')(app, passport);
const user = require('./app/helper/user');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(morgan('dev'));                                       //START LOG IN THE REQUEST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));              // START PARSING THE DATA
app.use('/api', userRoutes);                                      // USE THE ROUTES ( IT'S IMPORTANT ROUTES TO BE LAST BECAUSE THE REQUESTED DATA MUST BE PARSED)
app.use('/ingredientsApi', ingredientsRoutes);
app.use('/order', orderRoutes);
app.use('/pizzaApi', pizzaRoutes);
app.use('/customApi', customRoutes);
app.use(express.static(__dirname + '/public'));                  // WITH THIS ONE WE LET FRONTEND TO ACCESS TO BACKEND
                                                                // WE ARE ADDING '/api' SO IT WILL DECONFLICT THE BACKEND AND FRONT-END ROUTES


mongoose.connect('mongodb://localhost:27017/pizzacapedb', function(err, connection) {       // Connecting to MongoDB(pizzacapedb)
    if (err) {
        console.log('Cannot connect to the database: ' + err);
    } else {
        console.log('Successfully connected to MongoDB');
        user.initializeAdmin(connection);
    }
});

app.get('*', function(req, res) {                                       // we use * so no matter what users types we feed them with this file
    res.sendFile(path.join(__dirname + '/public/app/views/index.html')); // we take the current path and join with the html file
});

app.listen(port, function () {
    console.log('server is running on port ' + port);
});