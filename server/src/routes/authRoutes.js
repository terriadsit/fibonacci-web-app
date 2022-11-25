const express = require("express");
const passport = require("passport");
const authRouter = express.Router();
const { getName } = require('../controllers/authController')

function checkLoggedIn(req, res, next) {  //req.user set up by serializeUser
  const isLoggedIn = req.isAuthenticated() && req.user; // isAuthenticated set by passport 
  if (!isLoggedIn) {
      return res.status(200).json({
          error: 'You must log in!',
      })
  } 
  next();
}

authRouter.get('/google', 
    passport.authenticate('google', {
        scope: ['email', 'profile']
    })
);

authRouter.get('/google/callback', 
  passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/',
    session: true,          // save the session
  }), 
  (req, res) => {
      console.log('Google called us back!')
  }
);

authRouter.get('/failure', (req, res) => {
    return res.send('Failed to log in!')
})

authRouter.get('/logout', (req, res) => {
  req.logout();  // Removes req.user and clears any logged in session
  return res.redirect('/')
});

authRouter.get('/getName', checkLoggedIn, getName);

module.exports = authRouter;