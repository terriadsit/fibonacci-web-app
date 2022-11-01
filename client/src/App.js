import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";


// styles and images
import logo from './logo.svg';
import './App.css';

// pages and components
import Navbar from './components/navbar';
import AgainstAI from '../src/pages/againstAI';
import Directions from '../src/pages/directions';
import Home from '../src/pages/home';
import Local from '../src/pages/local';
import Online from '../src/pages/online';

const ENDPOINT = "http://127.0.0.1:8000";

function App() {
  const [response, setResponse] = useState("");
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        
        <div className="container">
           <Navbar />
           <Routes>
             <Route 
               path="/directions" 
               element={<Directions />} 
             />
             <Route 
               path="/" 
               element={<Home />} 
             />
             <Route 
               path="/againstAI" 
               element={<AgainstAI />} 
             />
             <Route 
               path="/local" 
               element={<Local />} 
             />
             <Route 
               path="/online" 
               element={<Online />} 
             />
             
          </Routes>
          </div>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
