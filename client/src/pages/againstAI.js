import React from 'react'

import GameManager from '../components/gameManager'

export default function AgainstAI() {
  return (
    <div>
      <GameManager gameType={'AI'} name1={''} name2={'A.I. Fibi'} />
    </div>
  )
}
