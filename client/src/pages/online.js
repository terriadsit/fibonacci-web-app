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

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected to socket',isConnected, socket.id)
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
    socket.on('next turn', () => {
      console.log('next turn', turnCount)
    })

    return () => {
      socket.off('next turn')
    }
  })

  useEffect(() => {
    socket.on('startGame', refereeId => {
      console.log('Referee is', refereeId, 'playerName', playerName, isReferee)
      if (socket.id === refereeId) {
        setIsReferee(true)
        setPlayer1Name(playerName)
        const max = 50
        const random = Math.floor(Math.random() * max) + 5
        setBeginning(random)
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
      setPlayer1Name(beginData.player1Name)
    })

    socket.on('player2Name', player2Name => {
      console.log('client player2Name', player2Name)
      setPlayer2Name(player2Name.player2Name)
    })

    return () => {
      socket.off('player2Name')
      socket.off('begin')
      socket.off('startGame')
    }
  }, [playerName])

  const player1ChoosesProps = {
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
    socket.emit('next turn', {})
    setTurnCount(turnCount + 1)
    setPresentNumber(beginning - arraySum(history))
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
      {startGame && player1Turn && !player2Won && !player1Won && (
        <PlayerChooses {...player1ChoosesProps} />
      )}
      {startGame &&
        !player1Turn &&
        !player2Won &&
        !player1Won && <PlayerChooses {...player2ChoosesProps} />}

      {player1Turn && startGame && !player2Won && !player1Won && (
        <button data-cy='next-button' className='btn' onClick={handleClick}>
          {player1Name} Turn
        </button>
      )}
      {!player1Turn && startGame && !player2Won && !player1Won && (
        <button data-cy='next-button' className='btn' onClick={handleClick}>
          {player2Name} Turn
        </button>)}
      
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
