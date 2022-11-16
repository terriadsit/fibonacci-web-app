import { BrowserRouter, Route, Routes } from 'react-router-dom';



// styles and images

import './App.css';

// pages and components
import Navbar from './components/navbar';
import AgainstAI from '../src/pages/againstAI';
import Home from '../src/pages/home';
import Local from '../src/pages/local';
import Online from '../src/pages/online';




function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        
        <div className="container">
           <Navbar />
           <Routes>
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
