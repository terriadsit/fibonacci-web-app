import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

import arraySum from '../shared/arraySum'
import updateStatistics from '../shared/updateStatistics'
import myLogger from '../shared/myLogger'

// styles
import './playerChooses.css'

export default function PlayerChooses ({ ...props }) {
  const { user } = useAuthContext()
  const [tempRemove, setTempRemove] = useState(0)
  const [error, setError] = useState('')

  const gameType = props.gameType
  const previousNumber = props.previousNumber
  const setPlayer1Turn = props.setPlayer1Turn
  const setPlayerRemove = props.setPlayerRemove
  const setPlayerWon = props.setPlayerWon
  const beginning = props.beginning
  const setHistory = props.setHistory
  const history = props.history
  const name = props.name
  const prevName = props.prevName
  
  const removedSoFar = arraySum(history)

  let largest = previousNumber === 0 ? beginning - 1 : previousNumber * 2
  if (largest > beginning - removedSoFar) {
    largest = beginning - removedSoFar
  }

  function checkForWin (removed) {
    if (beginning - removedSoFar - removed === 0) {
      setPlayerWon(true)
      // only player1 can be logged in and save stats
      if (user){
        switch (gameType) {
          case 'AI':
            updateStatistics(user.id, 'aiWins')
            break;
          case 'local':
            if (history.length % 2 === 0) {
              updateStatistics(user.id, 'localWins')
            } else {
              updateStatistics(user.id, 'localLosses')
            }
            break;
          case 'online':
            // manage updateStatistics in online.js
           
            break;
          default:
            myLogger('must be online, ai or local game')
        }
      }
    }
  }

  let num = 0;
  function onChange (e) {
    num = e.target.value.replace(/[^0-9]/g, '');
    setError('')
    setTempRemove(num)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (tempRemove < 1 || tempRemove > largest) {
      setError(`Choose a number between 1 and ${largest}`)
    } else {
      setError('')
      setPlayerRemove(Number(tempRemove))
      checkForWin(tempRemove)
      setHistory(prev => [...prev, Number(tempRemove)])
      setPlayer1Turn(prev => !prev)
    }
    
  }

  return (
    <div>
      <div>
        {previousNumber !== 0 && (
          <p className='instructions'>
            The last player, {prevName}, removed {previousNumber}.
          </p>
        )}
       
        <form className="chooseumberContainer" onSubmit={handleSubmit}>
          <label>
            <span className="instructions">{name} may remove between 1 and {largest}</span>
            <input
              data-cy='remove'
              required
              type='number'
              value={tempRemove}
              onChange={onChange}
            />
          </label>
          <button data-cy="remove-button" className='btn'>Remove {tempRemove}</button>
        </form>
        {error && <p className='error'>{error}</p>}
      </div>
    </div>
  )
}

