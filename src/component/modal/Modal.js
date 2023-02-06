import React from "react";
import "./Modal.scss";
export default function Modal({ popupControl, closePopup, children }) {
  const bgClose = (e) => {
    console.log(e.target.id);
    if (e.target.id !== "popup-bg") return;
    closePopup();
  };

  return (
    <div
      id="popup-bg"
      className={!popupControl ? "disable" : "flex"}
      onClick={(e) => bgClose(e)}
    >
      <div id="modal-container">{children}</div>
    </div>
  );
}
