import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
const Modal = (props) => {
  
  return ReactDOM.createPortal(
    <div onClick={props.onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="modal_body">{props.children}</div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
