import React, { useState } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import Game from './screens/Game';
import Landing from './screens/Landing';
//import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
        
    </>
  )
}

export default App


