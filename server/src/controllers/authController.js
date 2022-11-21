const getName = (req, res) => {
    console.log('in secret path')
    return res.status(200).json({
        id: req.user.id, name: req.user.name
    })
}

module.exports = {
    getName,
}