import * as React from 'react'
import { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import updateStatistics from '../shared/updateStatistics'

// components and pages
import DisplaySticks from './displaySticks'
import InitialNumber from './initialNumber'
import PlayerChooses from './playerChooses'
import EnterName from './enterName'
import Directions from './directions'

import aiTurn from '../shared/aiTurn'
import arraySum from '../shared/arraySum'


export default function GameManager({gameType, name1, name2}) {
  const { user } = useAuthContext()
  
  const max = 150
  const tempRandom = Math.floor(Math.random() * max) + 5

  const [beginning, setBeginning] = useState(tempRandom)
  
  const [choseNumber, setChoseNumber] = useState(false) 
  const [presentNumber, setPresentNumber] = useState(0)
  const [player1Turn, setPlayer1Turn] = useState(true)
  const [player1Remove, setPlayer1Remove] = useState(0)
  const [player2Remove, setPlayer2Remove] = useState(0) 
  const [history, setHistory] = useState([])
  const [player1Won, setPlayer1Won] = useState(false)
  const [player2Won, setPlayer2Won] = useState(false)
  const [player1Name, setPlayer1Name] = useState(name1)
  const [player2Name, setPlayer2Name] = useState(name2)

  useEffect(() => {
    setPresentNumber(beginning)
    setHistory([])
  }, [beginning])

  useEffect(() => {
    if (user) {
      setPlayer1Name(user.name)
    }
  }, [user])

  useEffect(() => {
    const totalRemoved = arraySum(history)
    console.log('player1Turn useEffect', beginning)
    setPresentNumber(beginning - totalRemoved)
  }, [player1Turn, beginning, history])

  const initialProps = {
    initial: tempRandom,
    setBeginning: beginning => setBeginning(beginning),
    setChoseNumber: choseNumber => setChoseNumber(choseNumber),
    setPlayer1Turn: player1Turn => setPlayer1Turn(player1Turn)
  }

  const player1ChoosesProps = {
    gameType: gameType,
    previousNumber: player2Remove,
    name: player1Name,
    prevName: player2Name,
    history: history,
    beginning: beginning,
    setPlayer1Turn: player1Turn => setPlayer1Turn(player1Turn),
    setPlayerRemove: player1Remove => setPlayer1Remove(player1Remove),
    setHistory: history => setHistory(history),
    setPlayerWon: player1Won => setPlayer1Won(player1Won)
  }

  const player2ChoosesProps = {
    gameType: gameType,
    previousNumber: player1Remove,
    name: player2Name,
    prevName: player1Name,
    history: history,
    beginning: beginning,
    setPlayer1Turn: player1Turn => setPlayer1Turn(player1Turn),
    setPlayerRemove: player2Remove => setPlayer2Remove(player2Remove),
    setHistory: history => setHistory(history),
    setPlayerWon: player2Won => setPlayer2Won(player2Won)
  }

 
  function aiWins () {
    setPlayer2Won(true)
    if (user) {
      updateStatistics(user.id, 'aiLosses')
    }
  }


  function aiTurnEnds () {
    console.log('inAiTurnEnds',presentNumber, player1Remove);

    aiTurn(presentNumber, player1Remove, setHistory, setPlayer2Remove, aiWins)
    setPlayer1Turn(true)
  }
  
  function handleNewGame () {
    setChoseNumber(false)
    setPresentNumber(0)
    setPlayer1Turn(true)
    setHistory([])
    setPlayer1Remove(0)
    setPlayer2Remove(0)
    setBeginning(tempRandom)
    setPlayer1Won(false)
    setPlayer2Won(false)
    if (gameType === 'local') {
      setPlayer2Name('')
    }
  }
  
  function whichGame() {
    switch(gameType) {
     case 'AI': {
        aiTurnEnds()
        break;
      }
      case 'local': {
        //setPlayer1Turn(prev => !prev)
        break;
      }
      case 'online': {
        console.log('online game in switch')
        break;
      }
      default: {
        console.log('must be a local, AI or online game')
      }
    }

  }
   
  return (
    <div className='container'>
         <div>
          {!player1Name && <EnterName setPlayerName={setPlayer1Name} player={'1'}/>}
          {!choseNumber && gameType === 'local' && <EnterName setPlayerName={setPlayer2Name} player={'2'}/>}
        
          {!choseNumber && player1Name && player2Name && <InitialNumber {...initialProps} />}
          {choseNumber && <Directions />}
          {choseNumber && <p>Beginning Game with {beginning} sticks.</p>}
          {choseNumber && <p>Presently there are {presentNumber} sticks.</p>}
          {choseNumber && player1Turn && !player2Won && !player1Won && <PlayerChooses {...player1ChoosesProps} />}
          {choseNumber && gameType !== 'AI' && !player1Turn && !player2Won && !player1Won && <PlayerChooses {...player2ChoosesProps} />}
     
          {choseNumber && !player2Won && !player1Won && (
            <button data-cy="next-button" className='btn' onClick={whichGame}>
               Next Turn
            </button>
          )}

          {player1Won && <p data-cy="player1-won">{player1Name} won after choosing {player1Remove} sticks!</p>}
          {player2Won && <p data-cy="player2-won">{player2Name} won after choosing {player2Remove} sticks!</p>} 
          {(player1Won || player2Won) && <button className='btn' onClick={handleNewGame}>New Game</button>}
          {choseNumber && <DisplaySticks howMany={presentNumber} />}
      </div>
     
    </div>
  )
}


