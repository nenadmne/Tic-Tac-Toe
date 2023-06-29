import { createContext } from "react";

const DUMMY_DATA = [
  {
    id: "Player 1",
    name: "Player 1 name",
    mark: "X",
  },
  {
    id: "Player 2",
    name: "Player 2 name",
    mark: "O",
  },
];

const GameContext = createContext({
  items: DUMMY_DATA,
  players: [],
  playerInfo: [],
  addNewPlayer: (item) => {},
  setPlayerInfo: (item)=>{},
  resetPlayers: () => {}
});

export default GameContext;
