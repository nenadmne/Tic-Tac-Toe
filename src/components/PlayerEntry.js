import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../UI/Card";
import "./PlayerEntry.css";
import GameContext from "../UI/game-context";
import Loader from "./Loader";

const PlayerEntry = (props) => {
  const gameCtx = useContext(GameContext);
  const { items, players, setPlayerInfo } = gameCtx;

  const editButtonHandler = (id, mark) => {
    setPlayerInfo(id, mark);
  };

  return (
    <Fragment>
      <Card className="player-wrapper">
        <main>
          <ul className="player-information">
            {items.map((item) => {
              let player = null;
              if (players.length > 0) {
                player = players.find((p) => p.id === item.id);
              }
              const lockedClass = player ? "locked" : "";

              return (
                <li key={item.id} className={lockedClass}>
                  <div className="player"> {item.id} </div>
                  <div className="playerName">
                    {player ? player.name : item.name}
                  </div>
                  <div className="mark"> {item.mark} </div>
                  <Link to='/enter-name'>
                    <button
                      onClick={() => editButtonHandler(item.id, item.mark)}
                    >
                      Edit
                    </button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </main>
      </Card>
      {!props.show && <Loader gameOn={props.gameOn} />}
    </Fragment>
  );
};

export default PlayerEntry;
