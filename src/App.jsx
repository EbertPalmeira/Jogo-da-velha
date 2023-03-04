import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const emptyBoard = Array(9).fill("");

  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [winner, setWinner] = useState("");

  const handleClick = (index) => {
    if (winner) {
      return null;
    }
    if (board[index] !== "") {
      return null;
    }
    setBoard(
      board.map((item, itemIndex) =>
        itemIndex === index ? currentPlayer : item
      )
    );
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkWinner = () => {
    const possibleWaysWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];
    possibleWaysWin.map((cells) => {
      if (cells.every((cell) => cell === "O")) setWinner(" O ");
      if (cells.every((cell) => cell === "X")) setWinner(" X ");
    });
    checkDraw();
  };
  const checkDraw = () => {
    if (board.every((item) => item !== "")) setWinner("Deu empate");
  };

  useEffect(checkWinner, [board]);

  const reset = () => {
    setCurrentPlayer("O");
    setWinner(null);
    setBoard(emptyBoard);
  };
  return (
    <main>
      <h1>Jogo da velha</h1>
      <hr />
      <div className={"game"}>
        {board.map((item, index) => (
          <div
            className={`cell ${item}`}
            key={index}
            onClick={() => handleClick(index)}
          >
            {item}
          </div>
        ))}
      </div>
      {winner && (
        <div className="div-vencedor">
          {winner === "Deu empate" ? (
            <h2 className="winner-message">
              <p className={winner}>Empatou</p>
            </h2>
          ) : (
            <h2 className="winner-message">
              <p className={winner}>{winner}</p> venceu
            </h2>
          )}
          <button onClick={reset}>Reiniciar</button>
        </div>
      )}
    </main>
  );
}

export default App;
