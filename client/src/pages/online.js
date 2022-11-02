import React from 'react';
import { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";

import GameManager from '../components/gameManager';

const ENDPOINT = "http://127.0.0.1:8000";

export default function Online() {

  const [response, setResponse] = useState("");

  //useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    console.log(socket.id, 'socketid');
    socket.on("FromAPI", data => {
      setResponse(data);
    });
    socket.emit('ready');
    // CLEAN UP THE EFFECT
 //   return () => socket.disconnect();
    //
  //}, []);



  return (
    <div>
      <GameManager gameType={'online'} />
    </div>
  )
}
