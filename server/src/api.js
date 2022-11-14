// work with express server

const { Strategy } = require('passport-google-oauth20')
const passport = require('passport');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const { appendFile } = require('fs');
const api = express();

require('dotenv').config();  // allows use of .env

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
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
api.use(passport.initialize());  // manage authentication


api.use(cors({
    origin: 'http://localhost:3000',
}));

function checkLoggedIn(req, res, next) {
    const isLoggedIn = true; //TODO
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
    session: false,
  }), 
  (req, res) => {
      console.log('Google called us back!')
  }
);

api.get('/failure', (req, res) => {
    return res.send('Failed to log in!')
})

api.get('/auth/logout', (req, res) => {

});

api.get('/secret', checkLoggedIn, (req, res) => {
    return res.send('Your personal secret value is 42!')
});

// Send routes other than those above through Client index.html in public build
api.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..','public', 'index.html'));
})



module.exports = api;