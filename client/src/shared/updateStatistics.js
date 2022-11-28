const updateStatistics = async (googleId, change) => {

    const object = { change, googleId }
    console.log('object', object)
    const response = await fetch(`/stat/updateStats`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object) //body must be a string
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