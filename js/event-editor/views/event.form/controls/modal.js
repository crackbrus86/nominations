import React from "react";

const Modal = (props) => {
  return (
    props.show && (
      <div
        className="blackout"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        }}
      >
        {props.children}
      </div>
    )
  );
};

export default Modal;
