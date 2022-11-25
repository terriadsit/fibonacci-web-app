const getStats = (req, res) => {
    console.log('in getStats path')
    return res.status(200).json({
        message: 'in getStats path'
    })
}

const updateStats = async (req, res) => {
       const { id } = req.params
        
        console.log('req.body', req.body, 'id', id)

       // const field = req.body.field     
        
        // const statistics = await User.findOneAndUpdate({_id: id}, { $inc: {[field]: 1} }, {
        //     new: true,
        //     upsert: true,
        // })
    
        // if (!statistics) {
        //     return res.status(404).json({error: 'Error updating statistics'})
        // }
    
        res.status(200).json({message: 'in updateStats'})
    
}

module.exports = {
    getStats,
    updateStats
}