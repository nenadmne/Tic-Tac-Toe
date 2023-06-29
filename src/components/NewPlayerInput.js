import { useContext, useState } from "react";
import "./NewPlayerInput.css";
import GameContext from "../UI/game-context";
import Card from "../UI/Card";
import { Link } from "react-router-dom";

const NewPlayerInput = () => {
  const gameCtx = useContext(GameContext);
  const { addNewPlayer, playerInfo } = gameCtx;

  const [enteredName, setEnteredName] = useState("");

  const onChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const confirmHandler = () => {
    addNewPlayer(enteredName, playerInfo[0].id, playerInfo[0].mark);
  };

  return (
    <Card className="newPlayerInput-wrapper">
      <form className="chosePlayer" onSubmit={submitHandler}>
        <div>
          <h1> Enter Name </h1>
          <label> Player Name </label>
          <input
            type="text"
            onChange={onChangeHandler}
            value={enteredName}
            minLength="3"
            maxLength="10"
            required
          />
        </div>
        <footer className="nameConfirmation">
          <button type="button">
            <Link to="/">Cancel</Link>
          </button>

          <button type="button" onClick={confirmHandler}>
            <Link to="/">Confirm</Link>
          </button>
        </footer>
      </form>
    </Card>
  );
};

export default NewPlayerInput;
