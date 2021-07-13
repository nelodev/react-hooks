// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({onClick, squares}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [currentSquares, setCurrentSquares] = useLocalStorageState(
    'squares',
    Array(9).fill(null),
  )
  const [moves, setMoves] = useLocalStorageState('moves', [])

  React.useEffect(() => {
    const numberOfSteps = currentSquares.filter(step => step).length
    const Steps = [
      <button disabled={numberOfSteps === 0}>
        1.- Go to game start {numberOfSteps === 0 ? '(current)' : ''}
      </button>,
      <br />,
    ]

    console.log('numberOfSteps', numberOfSteps)

    for (let i = 0; i < numberOfSteps; i++) {
      Steps.push(
        <React.Fragment>
          <button disabled={i === numberOfSteps - 1}>
            {i + 2}.- Go to move #{i + 2}{' '}
            {i === numberOfSteps - 1 ? '(Current)' : ''}
          </button>
          <br />
        </React.Fragment>,
      )
    }
    setMoves(Steps)
  }, [currentSquares, setMoves])

  function selectSquare(square) {
    const winnerAlreadyExists = calculateWinner(currentSquares)
    const squareAlreadyClicked = currentSquares[square]
    if (winnerAlreadyExists || squareAlreadyClicked) {
      return
    }

    const currentValue = calculateNextValue(currentSquares)
    const newSquares = [...currentSquares]
    newSquares[square] = currentValue

    setCurrentSquares(newSquares)

    if (calculateWinner(newSquares)) {
      return
    }
  }

  function restart() {
    setCurrentSquares(Array(9).fill(null))
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button
          className="restart"
          onClick={restart}
          disabled={!currentSquares.filter(square => square).length}
        >
          restart
        </button>
      </div>
      <div className="game-info">
        <div>
          {calculateStatus(
            calculateWinner(currentSquares),
            currentSquares,
            calculateNextValue(currentSquares),
          )}
        </div>
        <div>{moves}</div>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
