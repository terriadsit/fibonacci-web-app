// online play is managed through sockets. <Online /> manages all state and game play for online games
import io from 'socket.io-client'
import { useSnackbar } from 'notistack'

import { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

import updateStatistics from '../shared/updateStatistics'
import EnterName from '../components/enterName'
import DisplaySticks from '../components/displaySticks'
import PlayerChooses from '../components/playerChooses'
import arraySum from '../shared/arraySum'
import Directions from '../components/directions'
import usePrompt from '../hooks/usePrompt'
import Win from '../components/win'

const socket = io()

export default function Online () {
 
  const [playerName, setPlayerName] = useState('')    // player owning this state
  const [player1Name, setPlayer1Name] = useState('') // who is going first
  // eslint-disable-next-line
  const [player2Name, setPlayer2Name] = useState('')  // who is going second
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

  const { user } = useAuthContext()
  const { enqueueSnackbar } = useSnackbar();

  // most sticks:
  const max = 50

  // don't leave midgame without letting socket know
  const isBlocking = () => {
    return playerName;
  };

  usePrompt("Are you sure you want to leave this game?", isBlocking(), leaveGame);

   // if this player exits, let socket know so other player is not left waiting
    function leaveGame() {
    
    socket.emit('leave game') 
   }


  useEffect(() => {
    if (user) {
      setPlayerName(user.name)
    }
  },[user])


  // socket emitters for knowing a player is ready to play
  useEffect(() => {
    if (playerName) {
      socket.emit('ready')

    }
  }, [playerName])

  // socket listeners and emitters for game play 
  useEffect(() => {
    socket.on('startGame', refereeId => {
      if (socket.id === refereeId) {
        setIsReferee(true)
        setPlayer1Name(playerName) // referee is player1
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
      setBeginning(beginData.beginning)
      setPresentNumber(beginData.beginning)
      setThisPlayerName(playerName)
      setOtherPlayerName(beginData.player1Name)
      setPlayer1Name(beginData.player1Name)
    })

    socket.on('player2Name', player2Name => {
      setThisPlayerName(playerName)
      setOtherPlayerName(player2Name.player2Name)
      setPlayer2Name(player2Name.player2Name)
    })

    socket.on('next turn', (turnData, prevSocketId) => {
      setTurnCount(turnData.tempCount)
      setPlayer2Remove(turnData.player1Remove)
      setPlayer2Won(turnData.player1Won)
      setHistory(prev => [...prev, turnData.player1Remove])
    })

    // recieve 'player left' when other player leaves game
    socket.on('player left', () => {
       socket.emit('other player left') // this player must leave current room if other player left
       enqueueSnackbar('The other player exited this game.', { 
         variant: 'info',
         });
       handleNewGame()
    })

    return () => {
      socket.off('player2Name')
      socket.off('begin')
      socket.off('startGame')
      socket.off('next turn')
      socket.off('player left')
    }
  }, [playerName, handleNewGame])

  // manage shared state as player1 turn changes
  useEffect(() => {
    const totalRemoved = arraySum(history)
    setPresentNumber(beginning - totalRemoved)
  }, [player1Turn, beginning, history])

  // TODO make a reducer?
  useEffect(() => {
    handleNext()
    // eslint-disable-next-line 
  }, [player1Turn])

  // on win, save statistics to DB
  useEffect(() => {
    // only signed in users save stats
   if (user) {
      if (player1Won){
        updateStatistics(user.id, 'onlineWins')
      }  
      if (player2Won) {
        updateStatistics(user.id, 'onlineLosses')
      }
    }
  }, [player1Won, player2Won, user])

 
  const player1ChoosesProps = {
    gameType: 'online',
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
  }

  function resetGame() {
    setOtherPlayerName('')
    setPlayer2Name('')
    setPlayer1Name('')
    setHistory([])
    setPlayer1Remove(0)
    setPlayer2Remove(0)
    setPlayer1Won(false)
    setPlayer2Won(false)
    setTurnCount(0)
    setStartGame(false)
  }

  function handleNewGame () {
    resetGame()
    
    socket.emit('ready')
    
  }

  return (
    <div className="container">
       {!playerName && <EnterName setPlayerName={setPlayerName} player={'0'} />}
      
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
        <>
          <p data-cy='player1-won'>
            {thisPlayerName} won after choosing {player1Remove} sticks!
          </p>
          <Win playerName={thisPlayerName} />
          <DisplaySticks howMany={500} />
        </>
      )}
      {player2Won && (
        <p data-cy='player2-won'>
          {otherPlayerName} won after choosing {player2Remove} sticks!
          <Win playerName={otherPlayerName} />
          <DisplaySticks howMany={500} />
        </p>
      )}
      {(player1Won || player2Won) && <button className='btn' onClick={handleNewGame}>New Game</button>}
      {startGame && <DisplaySticks howMany={presentNumber} />}
    </div>
  )
}
