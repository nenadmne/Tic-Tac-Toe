import { useState, useEffect } from "react";
import "./Chat.css";
import Card from "../UI/Card";

const Chat = () => {
  const [enteredValue, setEnteredValue] = useState("");
  const [messages, setMessages] = useState([]);

  const onChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const clickHandler = async () => {
    const currentTimestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    await fetch(
      "https://food-700ab-default-rtdb.europe-west1.firebasedatabase.app/chat.json",
      {
        method: "POST",
        body: JSON.stringify({
          value: enteredValue,
          timestamp: currentTimestamp,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = await fetch(
      "https://food-700ab-default-rtdb.europe-west1.firebasedatabase.app/chat.json",
      {
        method: "GET",
      }
    );
    const data = await response.json();

    const latestMessageKey = Object.keys(data).pop(); // Get the key of the latest message
    const latestMessage = data[latestMessageKey].value; // Get the value of the latest message
    const latestMessageTime = data[latestMessageKey].timestamp; // Get the time of the latest message

    setMessages([
      ...messages,
      {
        id: latestMessageKey,
        message: latestMessage,
        timestamp: latestMessageTime,
      },
    ]);

    setEnteredValue("");
  };

  useEffect(() => {
    setMessages([]);
  }, []);

  const chatMessage = messages.map((item) => {
    return (
      <li key={item.id}>
        <strong className="messageTime">{item.timestamp}:</strong>
        {item.message}
      </li>
    );
  });

  return (
    <Card className="chat-wrapper">
      <form onSubmit={submitHandler}>
        {chatMessage}
        <input type="text" onChange={onChangeHandler} value={enteredValue} />
        <button onClick={clickHandler}> Send </button>
      </form>
    </Card>
  );
};

export default Chat;
