import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const BackDrop = (props) => {

  return ReactDOM.createPortal(
    <div className="backdrop">
      {props.children}
    </div>,
    document.getElementById("backdrop")
  );
};

export default BackDrop;
