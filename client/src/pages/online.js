import React from 'react'
import { useState, useEffect } from 'react'

import io from 'socket.io-client'

//import GameManager from '../components/gameManager'
import EnterName from '../components/enterName'
import DisplaySticks from '../components/displaySticks'
import PlayerChooses from '../components/playerChooses'
import arraySum from '../shared/arraySum'

const ENDPOINT = 'http://127.0.0.1:8000'
const socket = io(ENDPOINT)

export default function Online () {
  const [isConnected, setIsConnected] = useState(socket.connected)

  const [playerName, setPlayerName] = useState('')
  const [player1Name, setPlayer1Name] = useState('')
  const [player2Name, setPlayer2Name] = useState('')
  const [isReferee, setIsReferee] = useState(false)
  const [startGame, setStartGame] = useState(false)
  const [turnCount, setTurnCount] = useState(0)
  const [beginning, setBeginning] = useState(0)

  const [presentNumber, setPresentNumber] = useState(0)
  const [player1Turn, setPlayer1Turn] = useState(true)
  const [player1Remove, setPlayer1Remove] = useState(0)
  const [player2Remove, setPlayer2Remove] = useState(0)
  const [history, setHistory] = useState([])
  const [player1Won, setPlayer1Won] = useState(false)
  const [player2Won, setPlayer2Won] = useState(false)
  const [thisPlayerName, setThisPlayerName] = useState('')
  const [otherPlayerName, setOtherPlayerName] = useState('')

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected to socket', socket.id)
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      console.log('disconnected from socket')
      setIsConnected(false)
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [])

  useEffect(() => {
    if (playerName) {
      socket.emit('ready')
    }
  }, [playerName])

  useEffect(() => {
    socket.on('startGame', refereeId => {
      console.log('Referee is', refereeId, 'playerName', playerName)
      if (socket.id === refereeId) {
        setIsReferee(true)
        setPlayer1Name(playerName) // referee is player1
        const max = 50
        const random = Math.floor(Math.random() * max) + 5
        setBeginning(random)
        setPresentNumber(random)
        socket.emit('begin', {
          beginning: random,
          player1Name: playerName
        })
      } else {
        setPlayer2Name(playerName)
        socket.emit('player2Name', {
          player2Name: playerName
        })
      }
      setStartGame(true)
    })

    socket.on('begin', beginData => {
      console.log('client beginDAta', beginData)
      setBeginning(beginData.beginning)
      setPresentNumber(beginData.beginning)
      setThisPlayerName(playerName)
      setOtherPlayerName(beginData.player1Name)
      setPlayer1Name(beginData.player1Name)
    })

    socket.on('player2Name', player2Name => {
      console.log('client player2Name', player2Name)
      setThisPlayerName(playerName)
      setOtherPlayerName(player2Name.player2Name)
      setPlayer2Name(player2Name.player2Name)
    })

    socket.on('next turn', (turnData, prevSocketId) => {
      console.log('next turn', turnData, socket.id, prevSocketId)
      
        
        console.log('in next turn if ')
        
        setPlayer2Remove(turnData.player1Remove)
        setPlayer2Won(turnData.player1Won)
        setHistory(prev => [...prev, turnData.player1Remove])
      
        
        //setPlayer1Remove(turnData.player1Remove)
        //setPlayer1Won(turnData.player1Won)
        
        
      
    })

    return () => {
      socket.off('player2Name')
      socket.off('begin')
      socket.off('startGame')
      socket.off('next turn')
    }
  }, [playerName])

  useEffect(() => {
    const totalRemoved = arraySum(history)
    console.log('player1Turn useEffect', beginning, history)
    setPresentNumber(beginning - totalRemoved)
  }, [player1Turn, beginning, history])

  const player1ChoosesProps = {
    previousNumber: player2Remove,
    name: thisPlayerName,
    prevName: otherPlayerName,
    history: history,
    beginning: beginning,
    setPlayer1Turn: player1Turn => setPlayer1Turn(player1Turn),
    setPlayerRemove: player1Remove => setPlayer1Remove(player1Remove),
    setHistory: history => setHistory(history),
    setPlayerWon: player1Won => setPlayer1Won(player1Won)
  }

  const player2ChoosesProps = {
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

  function handleClick () {
    socket.emit('next turn', {
      history,
      player1Turn,
      player1Remove,
      player2Remove,
      player1Won,
      player2Won
    })
    setTurnCount(turnCount + 1)
    setPresentNumber(beginning - arraySum(history))
    console.log('in handleClick online', history, isConnected, isReferee)
  }

  return (
    <div>
      {!playerName && <EnterName setPlayerName={setPlayerName} player={'0'} />}
      {playerName && <p>Welcome {playerName}</p>}
      {!startGame && <p>Waiting for another player to join...</p>}
      {startGame && (
        <p>
          {player1Name} is playing {player2Name}. {player1Name} begins.
        </p>
      )}
      {startGame && <p>Presently there are {presentNumber} sticks.</p>}
      {startGame &&  !player2Won && !player1Won && (
        <fr>
          <PlayerChooses {...player1ChoosesProps} />
          <p>
            player1 {isReferee} player1Turn {player1Turn}
          </p>
        </fr>
      )}
      {/* {startGame && !isReferee && player1Turn && !player2Won && !player1Won && (
        <fr>
          <PlayerChooses {...player2ChoosesProps} />
          <p>
            player2 {isReferee} player2Turn {player1Turn}
          </p>
        </fr>
      )} */}

      { startGame && !player2Won && !player1Won && (
        <button data-cy='next-button' className='btn' onClick={handleClick}>
          turn done
        </button>
      )}
      {/* {player1Turn && isReferee && startGame && !player2Won && !player1Won && (
        <button data-cy='next-button' className='btn' onClick={handleClick}>
          player2 turn done
        </button> 
      )}*/}

      {player1Won && (
        <p data-cy='player1-won'>
          {player1Name} won after choosing {player1Remove} sticks!
        </p>
      )}
      {player2Won && (
        <p data-cy='player2-won'>
          {player2Name} won after choosing {player2Remove} sticks!
        </p>
      )}
      {startGame && <DisplaySticks howMany={presentNumber} />}
    </div>
  )
}
