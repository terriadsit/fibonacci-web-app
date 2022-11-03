import React from 'react';
import { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import io from 'socket.io-client';

import GameManager from '../components/gameManager';
import EnterName from '../components/enterName';

const ENDPOINT = "http://127.0.0.1:8000";
const socket = io(ENDPOINT);

export default function Online() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  const [response, setResponse] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [isReferee, setIsReferee] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [beginning, setBeginning] = useState(0);
  
  let playerNumber = 0;
    
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected to socket', socket.id)
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('disconnected from socket')
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  useEffect(() => {
    if (playerName) {
      socket.emit('ready');
    }
  },[playerName]);

  useEffect(() => {
    socket.on('next turn', () => {
      console.log('next turn', turnCount)
    })
  });

  useEffect(() => {
    socket.on('startGame', (refereeId) => {
      console.log('Referee is', refereeId, 'isRef', isReferee);
      if (socket.id === refereeId) {
        setIsReferee(true);
        setPlayer1Name(playerName);
        const max = 50;
        const random = Math.floor(Math.random() * max) + 5;
        setBeginning(random);
        socket.emit('begin', ({
          beginning: random,
          player1Name: playerName
        }));
      } else {
        setPlayer2Name(playerName);
        socket.emit('player2Name', {
          player2Name: playerName
        })
      };
      setStartGame(true)
    });

    socket.on('begin', (beginData) => {
      console.log('client beginDAta', beginData);
      setBeginning(beginData.beginning);
      setPlayer1Name(beginData.player1Name);
    });

    socket.on('player2Name', (player2Name) => {
      console.log('client player2Name', player2Name)
      setPlayer2Name(player2Name.player2Name)
    });

  }, []);

 function handleClick() {
  socket.emit('next turn', ({
    playerName,
    player1Name,
    player2Name
  }));
  setTurnCount(turnCount + 1);
 }

  return (
    <div>
      
      {!playerName && <EnterName setPlayerName={setPlayerName} player={'0'}/>}
      {playerName && <p>Welcome {playerName}</p>}
      {!startGame && <p>Waiting for another player to join...</p>}
      {startGame && <p>{player1Name} is playing {player2Name} starting with {beginning} sticks. {player1Name} begins.</p>}
      {startGame && <p>{player1Name} may remove between 1 and {beginning - 1} sticks.</p>}
      {startGame && <button onClick={handleClick}>Next Turn</button>}
    
    </div>
  )
}
