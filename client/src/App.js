import { BrowserRouter, Route, Routes } from 'react-router-dom';



// styles and images

import './App.css';

// pages and components
import Navbar from './components/navbar';
import AgainstAI from '../src/pages/againstAI';
import Home from '../src/pages/home';
import Local from '../src/pages/local';
import Online from '../src/pages/online';
import Welcome from './components/welcome';
import Statistics from './pages/statistics';
import Privacy from './pages/privacy';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        
        <div className="container">
           <Navbar />
           <Welcome />
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
             <Route 
               path="/statistics" 
               element={<Statistics />} 
             />
             <Route 
               path="/privacy" 
               element={<Privacy />} 
             />
          </Routes>
          </div>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
