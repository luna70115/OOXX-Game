import { useState } from "react";

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Board({ value, change, onPlay, onagain }) {
  function handleClick(i) {
    if (value[i] || calculateWinner(value)) return;

    const squaresValue = value.slice();
    if (change) {
      squaresValue[i] = "X";
    } else {
      squaresValue[i] = "O";
    }
    onPlay(squaresValue);
  }
  const winner = calculateWinner(value);

  const result = winner
    ? "Winner: " + winner
    : "Next player: " + (change ? "X" : "O");

  return (
    <>
      <div className="board__status">{result}</div>
      <div className="board-box">
        <div className="board-row">
          <Square value={value[0]} onClick={() => handleClick(0)} />
          <Square value={value[1]} onClick={() => handleClick(1)} />
          <Square value={value[2]} onClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={value[3]} onClick={() => handleClick(3)} />
          <Square value={value[4]} onClick={() => handleClick(4)} />
          <Square value={value[5]} onClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={value[6]} onClick={() => handleClick(6)} />
          <Square value={value[7]} onClick={() => handleClick(7)} />
          <Square value={value[8]} onClick={() => handleClick(8)} />
        </div>
      </div>

      <button className="board__again" onClick={onagain}>
        重新開局
      </button>
    </>
  );
}

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
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [value, setValue] = useState([new Array(9).fill(null)]);
  const [isjump, setIsJump] = useState(0);
  const change = isjump % 2 === 0;
  const newValue = value[isjump];

  function handlePlay(squaresValue) {
    const history = [...value.slice(0, isjump + 1), squaresValue];
    setValue(history);
    setIsJump(history.length - 1);
  }
  function jumpTo(jumpIndex) {
    setIsJump(jumpIndex);
  }
  const jump = value.map((prev, i) => {
    const stage = i > 0 ? "Go to move #" + i : "Go to game start";
    return (
      <li key={i}>
        <button className="game__stage" onClick={() => jumpTo(i)}>
          {stage}
        </button>
      </li>
    );
  });

  function handleagain(value) {
    setValue([Array(9).fill(null)]);
    setIsJump(0);
  }

  return (
    <>
      <div className="game">
        <h1 className="game__title">OOXX Game</h1>
        <div className="game__box">
          <div className="game__board">
            <Board
              value={newValue}
              change={change}
              onPlay={handlePlay}
              onagain={handleagain}
            />
          </div>
          <div className="game__info">
            <ol className="game__ol">{jump}</ol>
          </div>
        </div>
      </div>
    </>
  );
}
