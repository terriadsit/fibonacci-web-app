import React from 'react'

import GameManager from '../components/gameManager'

export default function Localocal() {
  return (
    <div>
      <GameManager gameType={'local'} name1={''} name2={''} />
    </div>
  )
}
