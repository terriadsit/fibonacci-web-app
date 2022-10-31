import React, { useState } from 'react'

export default function EnterName ({ setPlayerName, player }) {
  const [tempName, setTempName] = useState('')

  function handleChange(e) {
    setTempName(e.target.value)
  }

  console.log('in Entername', player)
  function handleSubmit (e) {
    e.preventDefault()
    setPlayerName(tempName)
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <span> Enter Player {player}'s name:</span>

        <div className='inputContainer'>
          <input
            
            onChange={handleChange}
            value={tempName}
            
            placeholder='display name'
          />
        </div>
        <button className='btn'>Name: {tempName}</button>
      </form>
    </div>
  )
}
