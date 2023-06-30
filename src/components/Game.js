import React, { useContext, useState, useEffect } from "react";
import Card from "../UI/Card";
import "./Game.css";
import GameContext from "../UI/game-context";
import { Link } from "react-router-dom";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill("")); // Array od 9 polja za prikaz table
  const [currentPlayer, setCurrentPlayer] = useState(""); // Prvi igrač "X"
  const [currentTurn, setCurrentTurn] = useState([]); // Za prikaz poruke sa potezom
  const [winner, setWinner] = useState(""); // Za proglašenje pobjednika
  const [moves, setMoves] = useState(0); // Odbrojavanje poteza/klikova

  const gameCtx = useContext(GameContext);
  const { players } = gameCtx;


  const xPlayer = players.find((player) => player.mark === "X"); // definisanje X igrača
  const oPlayer = players.find((player) => player.mark === "O"); // definisanje O igrača

  const xPlayerSpan = xPlayer ? (
    <span className="xSpan">{xPlayer.name}</span>
  ) : null;
  const oPlayerSpan = oPlayer ? (
    <span className="oSpan">{oPlayer.name}</span>
  ) : null;

  const handleClick = (index) => {
    // index dodijeljen svakom polju od 0 do 8 redom
    if (board[index] === "" && !winner) {
      // Ako je polje prazno (nije kliknuto još) i ako nema pobjednika
      const updatedBoard = [...board];
      console.log(updatedBoard);
      updatedBoard[index] = currentPlayer === xPlayer.id ? "X" : "O"; // Definisanje znaka kliknutog polja, currentPlayer početni definisao useEffect
      setBoard(updatedBoard); // Updejtovanje table sa prethodno unijetim znakom
      checkWinner(updatedBoard); // Provjera updejtovane table
      togglePlayer(); // Definiše naredni potez i narednog igrača za prikaz imena
      setMoves((prevMoves) => prevMoves + 1); // Uvećava se broj poteza/klika za 1
    }
  };

  const togglePlayer = () => {
    setCurrentPlayer((prevPlayer) =>
      prevPlayer === players[0].id ? players[1].id : players[0].id
    ); // Definicija igrača preko indexa 0 i 1 iz GameContexta.players

    const currentPlayerIndex = players.findIndex(
      // index trenutnog igrača
      (player) => player.id === currentPlayer
    );
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length; // index narednog igrača
    const nextPlayer = players[nextPlayerIndex]; // ime narednog igrača

    const nextPlayerSpan =
      nextPlayer.name === xPlayer.name ? [xPlayerSpan] : [oPlayerSpan];

    setCurrentTurn(nextPlayerSpan); // Definisanje narednog igrača na potezu
  };

  useEffect(() => {
    // Za riješenje problema definisanje prvog igrača bez obzira na redosled unesenih imena
    if (players.length === 2) {
      setCurrentPlayer(xPlayer.id);
      setCurrentTurn([xPlayerSpan]);
    }
  }, [players]);

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        // sko su [a], [b] i [c] iz dobitnih kombinacija isti znakovi onda imamo pobjednika
        const winnerPlayer = players.find((player) => player.mark === board[a]);
        setWinner(winnerPlayer.name);
        break;
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill("")); // Reset table sa praznim poljima
    setWinner(""); // reset pobjednika
    setMoves(0); // Reset broj poteza na 0
    gameCtx.resetPlayers(); // Brisanje imena igrača nakon završene partije
  };

  const isDraw = moves === 9 && !winner; // draw logic

  const header = // Naslov: "X protiv O"
    (
      <h1>
        {xPlayerSpan}
        {" vs "}
        {oPlayerSpan}
      </h1>
    );

  const checkWinnerSpan = winner === xPlayer.name ? xPlayerSpan : oPlayerSpan;
  const winnerMessage = // Poruka o proglašenju pobjednika
    (
      <p>
        {"Player "} {checkWinnerSpan} {" wins!"}
      </p>
    );

  return (
      <Card className="game-wrapper">
        <div className="notification">
          {header}
          {!winner && !isDraw && <p>{currentTurn}'s turn!</p>}
        </div>
        <ul className="board">
          {board.map((cell, index) => {
            return (
              <li
                key={index}
                className={`start ${cell ? "disabled" : ""} ${
                  winner && !cell ? "unused" : ""
                }`}
                onClick={() => handleClick(index)}
              >
                {cell === "X" ? "X" : cell === "O" ? "O" : ""}
              </li>
            );
          })}
        </ul>
        {winner && (
          <div className="game-over">
            {winnerMessage}
            <Link to="/">
              <button onClick={resetGame}>Play Again</button>
            </Link>
          </div>
        )}
        {!winner && isDraw && (
          <div className="game-over">
            <p>It's a draw!</p>
            <Link to="/">
              <button onClick={resetGame}>Play Again</button>
            </Link>
          </div>
        )}
      </Card>
  );
};

export default Game;

// export const loader = async () => {
//   const response = await fetch('http://localhost:3000/game');
//   if (!response.ok || response.errorIndicator) {
//     throw new Error('Error fetching data');
//   } else {
//     return response;
//   }
// };

// const Game = (props) => {
//   const [board, setBoard] = useState(Array(9).fill("")); // Array od 9 polja za prikaz table
//   const [currentPlayer, setCurrentPlayer] = useState(""); // Prvi igrač "X"
//   const [currentTurn, setCurrentTurn] = useState([]); // Za prikaz poruke sa potezom
//   const [winner, setWinner] = useState(""); // Za proglašenje pobjednika
//   const [moves, setMoves] = useState(0); // Odbrojavanje poteza/klikova

//   const gameCtx = useContext(GameContext);
//   const { players } = gameCtx;

//   const xPlayer = players.find((player) => player.mark === "X"); // definisanje X igrača
//   const oPlayer = players.find((player) => player.mark === "O"); // definisanje O igrača

//   const xPlayerSpan = <span className="xSpan">{xPlayer.name}</span>; // Span za X igrača
//   const oPlayerSpan = <span className="oSpan">{oPlayer.name}</span>; // Span za O igrača

//   const handleClick = (index) => {
//     // index dodijeljen svakom polju od 0 do 8 redom
//     if (board[index] === "" && !winner) {
//       // Ako je polje prazno (nije kliknuto još) i ako nema pobjednika
//       const updatedBoard = [...board];
//       updatedBoard[index] = currentPlayer === xPlayer.id ? "X" : "O"; // Definisanje znaka kliknutog polja, currentPlayer početni definisao useEffect
//       setBoard(updatedBoard); // Updejtovanje table sa prethodno unijetim znakom
//       checkWinner(updatedBoard); // Provjera updejtovane table
//       togglePlayer(); // Definiše naredni potez i narednog igrača za prikaz imena
//       setMoves((prevMoves) => prevMoves + 1); // Uvećava se broj poteza/klika za 1
//     }
//   };

//   const togglePlayer = () => {
//     setCurrentPlayer((prevPlayer) =>
//       prevPlayer === players[0].id ? players[1].id : players[0].id
//     ); // Definicija igrača preko indexa 0 i 1 iz GameContexta.players

//     const currentPlayerIndex = players.findIndex(
//       // index trenutnog igrača
//       (player) => player.id === currentPlayer
//     );
//     const nextPlayerIndex = (currentPlayerIndex + 1) % players.length; // index narednog igrača
//     const nextPlayer = players[nextPlayerIndex]; // ime narednog igrača

//     const nextPlayerSpan =
//       nextPlayer.name === xPlayer.name ? [xPlayerSpan] : [oPlayerSpan];

//     setCurrentTurn(nextPlayerSpan); // Definisanje narednog igrača na potezu
//   };

//   useEffect(() => {
//     // Za riješenje problema definisanje prvog igrača bez obzira na redosled unesenih imena
//     if (players.length === 2) {
//       setCurrentPlayer(xPlayer.id);
//       setCurrentTurn([xPlayerSpan]);
//     }
//   }, [players]);

//   const checkWinner = (board) => {
//     const winningCombinations = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];

//     for (let i = 0; i < winningCombinations.length; i++) {
//       const [a, b, c] = winningCombinations[i];
//       if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//         // sko su [a], [b] i [c] iz dobitnih kombinacija isti znakovi onda imamo pobjednika
//         const winnerPlayer = players.find((player) => player.mark === board[a]);
//         setWinner(winnerPlayer.name);
//         break;
//       }
//     }
//   };

//   const resetGame = () => {
//     setBoard(Array(9).fill("")); // Reset table sa praznim poljima
//     setWinner(""); // reset pobjednika
//     setMoves(0); // Reset broj poteza na 0
//     gameCtx.resetPlayers(); // Brisanje imena igrača nakon završene partije
//     props.gameOff(); // Vraćanje na homescreen
//   };

//   const isDraw = moves === 9 && !winner; // draw logic

//   const header = // Naslov: "X protiv O"
//     (
//       <h1>
//         {xPlayerSpan}
//         {" vs "}
//         {oPlayerSpan}
//       </h1>
//     );

//   const checkWinnerSpan = winner === xPlayer.name ? xPlayerSpan : oPlayerSpan;
//   const winnerMessage = // Poruka o proglašenju pobjednika
//     (
//       <p>
//         {"Player "} {checkWinnerSpan} {" wins!"}
//       </p>
//     );

//   return (
//     <Card className="game-wrapper">
//       <div className="notification">
//         {header}
//         {!winner && !isDraw && <p>{currentTurn}'s turn!</p>}
//       </div>
//       <ul className="board">
//         {board.map((cell, index) => {
//           return (
//             <li
//               key={index}
//               className={`start ${cell ? "disabled" : ""} ${
//                 winner && !cell ? "unused" : ""
//               }`}
//               onClick={() => handleClick(index)}
//             >
//               {cell === "X" ? "X" : cell === "O" ? "O" : ""}
//             </li>
//           );
//         })}
//       </ul>
//       {winner && (
//         <div className="game-over">
//           {winnerMessage}
//           <Link to='/'>
//             <button onClick={resetGame}>Play Again</button>
//           </Link>
//         </div>
//       )}
//       {!winner && isDraw && (
//         <div className="game-over">
//           <p>It's a draw!</p>
//           <Link to='/'>
//             <button onClick={resetGame}>Play Again</button>
//           </Link>
//         </div>
//       )}
//     </Card>
//   );
// };

// export default Game;
