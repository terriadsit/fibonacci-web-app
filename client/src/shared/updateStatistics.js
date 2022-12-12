// only users logged into Google may save or retrieve stats, change is the type of game lost or won for ex. "onlineWin"
const updateStatistics = async (googleId, change) => {

    const object = { change, googleId }
    console.log('object', object)
    const response = await fetch(`/stat/updateStats`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object) 
    })
    const json = await response.json()

    if (!response.ok) {
        console.log('error')
    }
    if (response.ok) {
        console.log('update added', json)
    }
}

export default updateStatistics