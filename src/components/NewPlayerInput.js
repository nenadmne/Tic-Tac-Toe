import { useContext, useState } from "react";
import "./NewPlayerInput.css";
import GameContext from "../UI/game-context";
import Card from "../UI/Card";
import { Link } from "react-router-dom";

const NewPlayerInput = () => {
  const gameCtx = useContext(GameContext);
  const { addNewPlayer, playerInfo } = gameCtx;
  const [fail, setFail] = useState(false);

  const [enteredName, setEnteredName] = useState("");

  const onChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const confirmHandler = () => {
    if (enteredName.length < 3) {
      setFail(true);
      return;
    } else {
      setFail(false);
      addNewPlayer(enteredName, playerInfo[0].id, playerInfo[0].mark);
    }
  };

  const message = <p className="warning"> Please enter min value of 3 characters !</p>;

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
            maxLength="10"
            required
          />
          {fail && message}
        </div>
        <footer className="nameConfirmation">
          <button type="button">
            <Link to="/">Cancel</Link>
          </button>

          <button type="button" onClick={confirmHandler}>
            {enteredName.length >= 3 ? (
              <Link to="/">Confirm</Link>
            ) : (
              <span>Confirm</span>
            )}
          </button>
        </footer>
      </form>
    </Card>
  );
};

export default NewPlayerInput;
