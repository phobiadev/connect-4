import { useState, useEffect } from "react"
import Grid from "./components/Grid"
import hasWon from "./connect4"

const createGrid = () => new Array(7).fill(new Array(6).fill("~"))

function count(arr,item) {
  let c = 0
  for (let x of arr) {
    if (x === item) {
      c++
    }
  }
  return c
}

export default function App() {
  const [grid, setGrid] = useState(createGrid())
  const [currentIcon,setCurrentIcon] = useState("X")
  const [gameOver, setGameOver] = useState(false)
  const [endGameMessage,setEndGameMessage] = useState("")

  function handleReset() {
    setGameOver(true)
    setEndGameMessage("restarting game...")

    setTimeout(() => {
      setGrid(createGrid())
      setCurrentIcon("X")
      setGameOver(false)
      setEndGameMessage("")
    },750)
    
  }

  function handleClick(colIdx) {
    if (gameOver) return;
    let newGrid = JSON.parse(JSON.stringify(grid))
    let column = grid[colIdx]
    let empty = count(column,"~")
    if (empty === 0) {
      return
    }
    let placeIdx = 6-empty
    newGrid[colIdx][placeIdx] = currentIcon
    let isGameOver = hasWon(newGrid,currentIcon)
    if (isGameOver !== false) {
      if (isGameOver === "DRAW") {
        setEndGameMessage("draw")
      }
      else {
        setEndGameMessage(`${currentIcon === "X" ? "Player 1 (red)" : "Player 2 (yellow)"} won`)
      }
      setGameOver(true)
    }
    setGrid(newGrid)
    setCurrentIcon(currentIcon === "X" ? "O" : "X")
  }


  return (
    <div className="app">
      <div className="title-container">
        CONNECT 4
      </div>
      <div className="grid-container">
        <Grid isOver={gameOver} handleColClick={handleClick} grid={grid} />
      </div>
      <div className="message-container">
        {!gameOver && <a>{currentIcon === "X" ? <a>Player 1 ({<a style={{color: "var(--red)"}}>red</a>})</a> : <a>Player 2 ({<a className="outline-text" style={{color: "var(--yellow)"}}>yellow</a>})</a>}'s go</a>}
        {gameOver && <a>{endGameMessage}</a>}
        
      </div>
      <div className="message-container">
        <button onClick={handleReset}>Reset Game</button>
      </div>
      
    </div>
  )
}