import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

// styles
import './statistics.css'

export default function Statistics () {
  const { user } = useAuthContext()
  const [statistics, setStatistics] = useState('')
  
  // avoiding division by 0 or nan
  const calculatePercent = (_wins, _losses) => {
    const wins = (!_wins) ? 0 : _wins
    const losses = (!_losses) ? 0 : _losses
    const total = wins + losses
    let percent = (total === 0) ? 'n/a' : `${Math.round(wins / total * 100)} %`
    return percent
  }

  // avoiding nan
  const calculateSums = (_online, _ai, _local ) => {
    const ai = (!_ai) ? 0 : _ai
    const local = (!_local) ? 0 : _local
    const online = (!_online) ? 0 : _online
    return (ai + local + online)
  }
 
  useEffect(() => {
    async function fetchStatistics () {
      const googleId = user.id
      const response = await fetch(`/stat/getStats/${googleId}`)
      const json = await response.json()

      if (response.ok) {
        console.log('json in get stats', json)
        setStatistics(json[0])
      }
    }

    if (user) {
      fetchStatistics()
    }
    console.log('get statistics here')
  }, [user])

  return (
    <div>
      {(user && statistics) ?
        <div className='grid-container'>
          <div className='item'></div>
          <div className='item'>Wins</div>
          <div className='item'>Losses</div>
          <div className='item'>Percentage of Wins</div>
          <div className='item'>Against A.I. Fibi:</div>
          <div className='item'>{statistics.aiWins}</div>
          <div className='item'>{statistics.aiLosses}</div>
          <div className='item'>{calculatePercent(statistics.aiWins, statistics.aiLosses)}</div>
          <div className='item'>Shared Screen:</div>
          <div className='item'>{statistics.localWins}</div>
          <div className='item'>{statistics.localLosses}</div>
          <div className='item'>{calculatePercent(statistics.localWins, statistics.localLosses)}</div>
          <div className='item'>Online Games:</div>
          <div className='item'>{statistics.onlineWins}</div>
          <div className='item'>{statistics.onlineLosses}</div>
          <div className='item'>{calculatePercent(statistics.onlineWins, statistics.onlineLosses)}</div>
          <div className='item'>All Games:</div>
          <div className='item'>{calculateSums(statistics.onlineWins, statistics.aiWins, statistics.localWins)}</div>
          <div className='item'>{calculateSums(statistics.onlineLosses, statistics.aiLosses, statistics.localLosses)}</div>
          <div className='item'>{calculatePercent(calculateSums(statistics.onlineWins, statistics.aiWins, statistics.localWins), calculateSums(statistics.onlineLosses, statistics.aiLosses, statistics.localLosses))}</div>
        </div>
        :
        <div>
          only logged in users may display statistics
        </div>
        }
    </div>
  )
}
