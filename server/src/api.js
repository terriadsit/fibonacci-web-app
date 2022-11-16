// work with express server
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const express = require('express');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20')
const cookieSession = require('cookie-session');

const { Cookies } = require('universal-cookie');

const cookiesMiddleware = require('universal-cookie-express');


// save the session to the cookie
//serializing means saving our user data to a cookie that's going to be passed around to our users
passport.serializeUser((user, done) => { 
    const userDetails = {id: user.id, name: user.displayName}
    done(null, userDetails);
});
 
// read the session from the cookie
//deserializing means loading that user data from that cookie into a value we can read
passport.deserializeUser((obj, done) => {
    console.log('deserialize', obj)
    
    done(null, obj);
})

const api = express();

require('dotenv').config();  // allows use of .env

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    COOKIE_KEY_1: process.env.COOKIE_KEY_1,
    COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

const AUTH_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
}

function verifyCallback(accessToken, refreshToken, profile, done) {
    console.log('Google profile', profile) 
    // TODO save user here into Database
    done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

api.use(helmet());  // manage common security issues

// have helmet check headers before doing anything with session
api.use(cookieSession({
    name: 'session',
    maxAge: 24* 60 * 60 * 1000, // user may stay logged in 24 hours
    keys: [ config.COOKIE_KEY_1, config.COOKIE_KEY_2 ],
}));


api.use(passport.initialize());  // manage authentication, sets up session
api.use(passport.session()); // uses keys to validate session, allows serializeUser to be called, sets req.user
//api.use(cookiesMiddleware());
//api.use(function(req, res) {
    //const cookies = new Cookies(req.headers.cookie);
    //console.log(cookies.get('session'), 'cookies get');
    //get the user cookies using universal-cookie
    //console.log('cookies middleware', req.user)
 //  req.universalCookies.get('session')
 //});
api.use(cors({
    origin: 'http://localhost:3000',
}));

function checkLoggedIn(req, res, next) {  //req.user set up by serializeUser
    const isLoggedIn = req.isAuthenticated() && req.user; // isAuthenticated set by passport 
    if (!isLoggedIn) {
        return res.status(200).json({
            error: 'You must log in!',
        })
    }
    next();
}

api.use(express.static(path.join(__dirname,"..", "public")));

api.get('/auth/google', 
    passport.authenticate('google', {
        scope: ['email', 'profile']
    })
);

api.get('/auth/google/callback', 
  passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/',
    session: true,          // save the session
  }), 
  (req, res) => {
      console.log('Google called us back!')
  }
);

api.get('/failure', (req, res) => {
    return res.send('Failed to log in!')
})

api.get('/auth/logout', (req, res) => {
  req.logout();  // Removes req.user and clears any logged in session
  return res.redirect('/')
});

api.get('/secret', checkLoggedIn, (req, res) => {
    return res.send('Your personal secret value is 42!')
});

// Send routes other than those above through Client index.html in public build
api.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..','public', 'index.html'));
})



module.exports = api;