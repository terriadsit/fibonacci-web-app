const mongoose = require('mongoose')
const Statistic = require('../models/statModel')

const getStats = (req, res) => {
  const { id } = req.params
  console.log('in getStats path')
  return res.status(200).json({
    message: 'in getStats path'
  })
}

const updateStats = async (req, res) => {
  console.log('req.body', req.body)

  // set key value object (wh/ doc field) to be increased
  const key = req.body.change
  const googleId = req.body.googleId
  let obj = {}
  obj[key] = 1

  console.log('obj', obj)
  const statistics = await Statistic.findOneAndUpdate(
    { googleId: googleId },
    { $inc: obj },
    {
      new: true,
      upsert: true
    }
  )

  if (!statistics) {
    return res.status(404).json({ error: 'Error updating statistics' })
  }

  res.status(200).json(statistics)
}

module.exports = {
  getStats,
  updateStats
}
