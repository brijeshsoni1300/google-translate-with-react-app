import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
const Modal = (props) => {
  // const [container, setContainer] = useState();
  // const [modalroot, setModalRoot] = useState(document.getElementById("modal-root"));
  //   useEffect(() => {
  //     const ctr = document.createElement("div");
  //     setContainer(ctr);
  //     modalroot.appendChild(container);
  //   }, [modalroot]);
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  });

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
