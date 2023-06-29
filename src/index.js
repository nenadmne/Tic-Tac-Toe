import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import GameProvider from "./UI/GameProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GameProvider>
    <App />
  </GameProvider>
);
