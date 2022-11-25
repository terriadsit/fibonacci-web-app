import { useEffect } from 'react'

export default function Statistics() {

    useEffect(() => {
        const fetchData = async () => {
            const googleId = '107690329016216797536'
            const change = 'aiWins'
            const response = await fetch(`/stat/updateStats/${googleId}`, {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({change}) //body must be a string
              })
              const json = await response.json()
          
              if (!response.ok) {
                console.log('error')
              }
              if (response.ok) {
                console.log('update added', json)
              }
        }
        fetchData()
    }, [])
    

  return (
    <div>Statistics</div>
  )
}
