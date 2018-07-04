const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const session = require('express-session');
const jwt = require('jsonwebtoken'); // Keep user logged in using this library
const secret = 'polarCape';


module.exports = function (app, passport) {
    let token;
    //INITIALIZE
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }));
    // serialize users once logged in
    passport.serializeUser(function(user, done) {
        // check if users's social media has an error
        if (user.active) {
            if (user.error) {
                token = 'unconfirmed/error';
            } else {
                token =  jwt.sign({ username: user.username, email: user.email }, secret, {expiresIn: '24h'});
            }
        } else {
            token = 'inactive/error';
        }

        done(null, user.id);
    });
        //DESERIALIZE Users once logged in
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //Facebook Strategy
    passport.use(new FacebookStrategy({
            clientID: '185097118808474',
            clientSecret: '0bc1174dd3e4cb8540649cc03a86d073',
            callbackURL: "http://localhost:7000/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'photos', 'email']         // allows us to customize what we want to g3et from Facebook
        },
        function(accessToken, refreshToken, profile, done) {
        console.log('profile._json.email');
        User.findOne({ email: profile._json.email}).select('username active password email').exec(function (err, user) {
            if (err) done(err);
            if (user && user !== null) {    // this helps if user has not verified his confirmation email
                done(null, user);
            } else {
                done(err);
            }
        });
           // done(null, profile); we don't want to return facebook profile , we want to return user from database
        }
    ));

    //Google Strategy
    passport.use(new GoogleStrategy({
            clientID: '149599931789-hphf41ti9kpfo0vuvnilph94bggck6va.apps.googleusercontent.com',
            clientSecret: 'iemne-ihOaZZqPzcx5gdSaOk',
            callbackURL: "http://localhost:7000/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({ email: profile.emails[0].value}).select('username active password email').exec(function (err, user) {
                if (err) done(err);
                if (user && user !== null) {    // this helps if user has not verified his confirmation email
                    done(null, user);
                } else {
                    done(err);
                }
            });
        }
    ));
    // ROUTES
    // Facebook Routes
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/facebookerror' }), function (req, res) {
        res.redirect('/facebook/' + token);     // this will forward user t0 facebook url
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }) );

    // Google Routes
                                                                                                    // GET /auth/google
                                                                                                    //   Use passport.authenticate() as route middleware to authenticate the
                                                                                                    //   request.  The first step in Google authentication will involve
                                                                                                    //   redirecting the user to google.com.  After authorization, Google
                                                                                                    //   will redirect the user back to this application at /auth/google/callback
    app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'] }));

                                                                                                    // GET /auth/google/callback
                                                                                                    //   Use passport.authenticate() as route middleware to authenticate the
                                                                                                    //   request.  If authentication fails, the user will be redirected back to the
                                                                                                    //   googleError.  Otherwise, the primary route function function will be called,
                                                                                                    //   which, in this example, will redirect the user to the home page.
    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/googleerror' }), function(req, res) {
            res.redirect('/google/' + token);
        });

    return passport;
};
