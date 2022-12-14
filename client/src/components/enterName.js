import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

// player is string, 0 for online, 1 or 2 for other game options
export default function EnterName ({ setPlayerName, player }) {
  const { dispatch } = useAuthContext()
  const [tempName, setTempName] = useState('')

  function handleChange(e) {
    setTempName(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    setPlayerName(tempName)
   // only logged in player 1 or 0 for online player changes logged in name
    if (player === '1' || player === '0') {
      dispatch({type: "LOGIN", payload: {id: '', name: tempName}})
    }
  }

  const text = player === '0' ? `Enter Player's name` : `Enter Player ${player}'s name`

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <span>{text}</span>

        <div className='inputContainer'>
          <input
            data-cy="playerName"
            onChange={handleChange}
            value={tempName}
            
            placeholder='display name'
          />
        </div>
        <button data-cy="name-button" className='btn'>Name: {tempName}</button>
      </form>
    </div>
  )
}
