import React from 'react'
import GomokuGame from './components/GomokuGame'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>五子棋游戏</h1>
        <p>Gomoku Game</p>
      </header>
      <main>
        <GomokuGame />
      </main>
    </div>
  )
}

export default App