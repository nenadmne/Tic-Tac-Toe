import "./Loader.css";
import Card from "../UI/Card";
import GameContext from "../UI/game-context";
import { Link } from "react-router-dom";
import { useContext } from "react";

const Loader = () => {
  const gameCtx = useContext(GameContext);
  const { players } = gameCtx;

  const classes =
    players.length === 1
      ? "half-load"
      : players.length === 2
      ? "full-loaded"
      : "";

  const message = players.length <1 ? "Enter player name!" : players.length === 1 ? "Enter second player name!" : 'Click to play!';
  const linking = players.length > 1 ? "/game" : "/";

  return (
    <Card className="loading">
      <Link to={linking}>
        <button>
          <span className="loading-text"> {message}</span>
          <span className={`loading-span ${classes}`}></span>
        </button>
      </Link>
    </Card>
  );
};

export default Loader;

// const Loader = (props) => {
//   const gameCtx = useContext(GameContext);
//   const { players } = gameCtx;

//   const classes =
//     players.length === 1
//       ? "half-load"
//       : players.length === 2
//       ? "full-loaded"
//       : "";

//   const gameActive = () => {
//     if (players.length === 2) {
//       props.gameOn();
//     }
//   };

//   const message = players.length < 2 ? "Loading game..." : "Click to play!";

//   return (
//     <Card className="loading">
//       <Link to="/game">
//         <button onClick={gameActive}>
//           <span className="loading-text"> {message}</span>
//           <span className={`loading-span ${classes}`}></span>
//         </button>
//       </Link>
//     </Card>
//   );
// };

// export default Loader;
