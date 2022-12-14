// only users logged into Google may retrieve or save stats
const mongoose = require('mongoose')
const Statistic = require('../models/statModel')

// retrieve stats for client
const getStats = async (req, res) => {
  const { id } = req.params
  const googleId = id
  const statistics = await Statistic.find({ googleId: googleId }) 

  if (!statistics || statistics.length === 0) {
      return res.status(404).json({error: 'No such user, sign in with Google Login'})
  }

  res.status(200).json(statistics)
}

// update the user's statistics if they are logged into Google
const updateStats = async (req, res) => {
  
  // set key value object (wh/ doc field) to be increased, ex "onlineWins"
  const key = req.body.change
  if (!key) {
    return res.status(404).json({ error: 'Error updating statistics, no change made' })
  }
  const googleId = req.body.googleId
  if (!googleId) {
    return res.status(404).json({ error: 'Error updating statistics, sign in with Google to save stats' })
  }
  let obj = {}
  obj[key] = 1

  const statistics = await Statistic.findOneAndUpdate(
    { googleId: googleId },
    { $inc: obj },  // increase the change field by one
    {
      new: true,
      upsert: true
    }
  )

  if (!statistics) {
    return res.status(404).json({ error: 'Error updating statistics' })
  }

  res.status(201).json(statistics)
}

module.exports = {
  getStats,
  updateStats
}
