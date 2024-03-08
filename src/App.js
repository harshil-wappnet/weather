// import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { StatusContext } from '../src/components/contexts/StatusContext'
import Navbar from './components/Navbar';
import Charts from './components/Charts';
import Home from './components/Home';
import { useState } from 'react';

function App() {
  const [status, setStatus] = useState(true);
  return (
    <div className="container">
      <StatusContext.Provider value={{ status, setStatus }}>
        <Navbar />
      </StatusContext.Provider>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/charts" element={<Charts />} />
      </Routes>
      <button className='btn btn-primary my-3' id="liveToastBtn" onClick={() => setStatus(!status)}>Status</button>
    </div >
  );
}

export default App;
