import GameContext from "./game-context";
import React, { useContext, useReducer } from "react";

const reducer = (state, action) => {
  if (action.type === "ADD") {
    if (state.players.length === 0) {
      return {
        ...state,
        players: [{ name: action.player, id: action.id, mark: action.mark }],
      };
    } else if (state.players.length === 1) {
      return {
        ...state,
        players: [
          ...state.players,
          { name: action.player, id: action.id, mark: action.mark },
        ],
      };
    }
  } else if (action.type === "ID") {
    return {
      ...state,
      playerInfo: [{ id: action.id, mark: action.mark }],
    };
  } else if (action.type === "RESET") {
    return {
      ...state,
      players: [],
    };
  }
  return state;
};

const GameProvider = (props) => {
  const gameCtx = useContext(GameContext);

  const defaultState = {
    items: gameCtx.items,
    players: [],
    playerInfo: [],
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  const addNewPlayer = (player, id, mark) => {
    dispatch({ type: "ADD", player: player, id: id, mark: mark });
  };

  const setPlayerInfo = (id, mark) => {
    dispatch({ type: "ID", id: id, mark: mark });
  };

  const resetPlayers = () => {
    dispatch({ type: "RESET" });
  };

  const providerValue = {
    items: state.items,
    players: state.players,
    playerInfo: state.playerInfo,
    addNewPlayer: addNewPlayer,
    setPlayerInfo: setPlayerInfo,
    resetPlayers: resetPlayers,
  };

  return (
    <GameContext.Provider value={providerValue}>
      {props.children}
    </GameContext.Provider>
  );
};
export default GameProvider;
