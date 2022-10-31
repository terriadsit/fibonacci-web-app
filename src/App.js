import { BrowserRouter, Route, Routes } from 'react-router-dom';


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

function App() {
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
