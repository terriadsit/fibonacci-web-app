// only users logged into Google may save or retrieve stats, change is the type of game lost or won for ex. "onlineWin"
import myLogger from "./myLogger"

const updateStatistics = async (googleId, change) => {

    const object = { change, googleId }
    const response = await fetch(`/stat/updateStats`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object) 
    })
    const json = await response.json()

    if (!response.ok) {
        myLogger('error')
    }
    if (response.ok) {
        myLogger('update added', json)
    }
}

export default updateStatistics