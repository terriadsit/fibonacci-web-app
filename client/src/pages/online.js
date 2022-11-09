import React from 'react'
import { useState, useEffect } from 'react'

import io from 'socket.io-client'

//import GameManager from '../components/gameManager'
import EnterName from '../components/enterName'
import DisplaySticks from '../components/displaySticks'
import PlayerChooses from '../components/playerChooses'
import arraySum from '../shared/arraySum'
import Directions from '../components/directions'

const ENDPOINT = 'http://127.0.0.1:8000'
const socket = io(ENDPOINT)

export default function Online () {
  const [isConnected, setIsConnected] = useState(socket.connected)

  const [playerName, setPlayerName] = useState('')
  const [player1Name, setPlayer1Name] = useState('')
  // eslint-disable-next-line
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
        setTurnCount(turnData.tempCount)
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

  useEffect(() => {
    handleNext()
    // eslint-disable-next-line
  }, [player1Turn])

  const player1ChoosesProps = {
    previousNumber: player2Remove,
    name: thisPlayerName,
    prevName: otherPlayerName,
    history: history,
    beginning: beginning,
    setPlayer1Turn: player1Turn => setPlayer1Turn(player1Turn),
    setPlayerRemove: player1Remove => setPlayer1Remove(player1Remove),
    setHistory: history => setHistory(history),
    setPlayerWon: player1Won => setPlayer1Won(player1Won),
    
  }
  function handleNext () {  
    let tempCount = turnCount
    tempCount++
    setTurnCount(tempCount)
    socket.emit('next turn', {
      history,
      player1Turn,
      player1Remove,
      player2Remove,
      player1Won,
      player2Won,
      tempCount
    })

    
    setPresentNumber(beginning - arraySum(history))
    console.log('in handleClick online', history, 'turn count', turnCount, 'tempCount', tempCount, isConnected, isReferee)
  }

  return (
    <div className="container">
      {!playerName && <EnterName setPlayerName={setPlayerName} player={'0'} />}
      {playerName && <p data-cy="welcome">Welcome {playerName}!</p>}
      {playerName && <Directions />}
      {!startGame && <p>Waiting for another player to join...</p>}
      {startGame && (
        <p>
          {thisPlayerName} is playing {otherPlayerName}. {player1Name} begins.
        </p>
      )}
      {startGame && <p>Presently there are {presentNumber} sticks.</p>}
      {startGame && ((turnCount % 2 === 1 && isReferee) || (turnCount % 2 === 0 && !isReferee)) 
        && !player2Won && !player1Won && 
          <PlayerChooses {...player1ChoosesProps} />
      }

      {startGame && ((turnCount % 2 === 0 && isReferee) || (turnCount % 2 === 1 && !isReferee)) 
        && !player2Won && !player1Won && 
        <p>Waiting for {otherPlayerName}...</p>
      }
      
      {player1Won && (
        <p data-cy='player1-won'>
          {thisPlayerName} won after choosing {player1Remove} sticks!
        </p>
      )}
      {player2Won && (
        <p data-cy='player2-won'>
          {otherPlayerName} won after choosing {player2Remove} sticks!
        </p>
      )}
      {startGame && <DisplaySticks howMany={presentNumber} />}
    </div>
  )
}
