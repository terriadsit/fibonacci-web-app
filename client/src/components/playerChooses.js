import React, { useState } from 'react'

import arraySum from '../shared/arraySum'

// styles
import './playerChooses.css'

export default function PlayerChooses ({ ...props }) {
  const [tempRemove, setTempRemove] = useState(0)
  const [error, setError] = useState('')

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
    console.log(
      'check for win beginning',
      beginning,
      'history',
      arraySum(history)
    )
    if (beginning - removedSoFar - removed === 0) {
      setPlayerWon(true)
    }
  }

  let num = 0;
  function onChange (e) {
   // console.log('onchange e', e.target)
    //num = e.target.value === NaN ? 0 : e.target.value;
    num = e.target.value.replace(/[^0-9]/g, '');
    //num = parseInt(e.target.value, 10);
    console.log('in onChange', num)
    setError('')
    setTempRemove(num)
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log('tempRemove', tempRemove)
    if (tempRemove < 1 || tempRemove > largest) {
      setError(`Choose a number between 1 and ${largest}`)
    } else {
      setError('')
      setPlayerRemove(tempRemove)
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

