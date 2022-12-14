import React from "react";
import "./Modal.scss";
export default function Modal({ popupControl, closePopup, children }) {
  return (
    <div id="popup-bg" className={!popupControl ? "disable" : "flex"}>
      <div id="modal-container">{children}</div>
    </div>
  );
}
