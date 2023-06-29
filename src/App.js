import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Fragment } from "react";
import NavigationBar from "./components/NavigationBar";
import PlayerEntry from "./components/PlayerEntry";
import BackDrop from "./UI/Modal";
import NewPlayerInput from "./components/NewPlayerInput";
import Chat from "./components/Chat";
import Game from "./components/Game";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Fragment>
          <NavigationBar />
          <PlayerEntry />
          <Chat />
        </Fragment>
      ),
    },
    {
      path: "/enter-name",
      element: (
        <BackDrop>
          <NewPlayerInput />
        </BackDrop>
      ),
    },
    {
      path: "/game",
      element: (
        <Fragment>
          <Game />
          <Chat />
        </Fragment>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

// const App = () => {
//   const [isActive, setIsActive] = useState(false);
//   const [gameIsActive, setGameIsActive] = useState(false);

//   const modalHandler = () => {
//     setIsActive(true);
//   };

//   const closeHandler = () => {
//     setIsActive(false);
//   };

//   const gameActivation = () => {
//     setGameIsActive(true);
//   };

//   const gameDectivation = () => {
//     setGameIsActive(false);
//   };

//   return (
//     <Fragment>
//       <NavigationBar />
//       {!gameIsActive && (
//         <PlayerEntry
//           modalHandler={modalHandler}
//           gameOn={gameActivation}
//           show={gameIsActive}
//         />
//       )}
//       {isActive && (
//         <BackDrop onClose={closeHandler}>
//           <NewPlayerInput onClose={closeHandler} />
//         </BackDrop>
//       )}
//       {gameIsActive && <Game gameOff={gameDectivation} />}
//       <Chat />
//     </Fragment>
//   );
// };

// export default App;
