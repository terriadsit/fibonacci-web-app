import React, { useState } from 'react'

export default function EnterName ({ setPlayerName, player }) {
  const [tempName, setTempName] = useState('')

  function handleChange(e) {
    setTempName(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    setPlayerName(tempName)
  }

  const text = player == 0 ? `Enter Player's name` : `Enter Player ${player}'s name`

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
