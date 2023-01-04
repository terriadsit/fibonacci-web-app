const getName = (req, res) => {
    
    return res.status(200).json({
        id: req.user.id, name: req.user.name
    })
}

module.exports = {
    getName,
}