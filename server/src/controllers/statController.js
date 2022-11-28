const mongoose = require('mongoose')
const Statistic = require('../models/statModel')

const getStats = (req, res) => {
  console.log('in getStats path')
  return res.status(200).json({
    message: 'in getStats path'
  })
}

const updateStats = async (req, res) => {
  const { id } = req.params

  console.log('req.body', req.body, 'id', id)
  // set key value object to be increased
  const key = req.body.change
  let obj = {}
  obj[key] = 1
  console.log('obj', obj)
  const statistics = await Statistic.findOneAndUpdate(
    { googleId: id },
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
