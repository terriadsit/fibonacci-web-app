const express = require("express");
const passport = require("passport");
const statRouter = express.Router();
const requireAuth = require('../middleware/requireAuth')

const { updateStats, getStats } = require('../controllers/statController');


// update users wins or losses
statRouter.post('/updateStats/:id', updateStats)

// get users stats
statRouter.get('/getStats', getStats)


module.exports = statRouter;