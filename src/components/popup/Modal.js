import React  from "react";
import ReactDOM from "react-dom";
import "./Modal.css";


  // comment should tell us why this thing now what this part is doing

/**
 * The Modal (pop up).
 * accpts a props object with the following properties:
 * @param {function} onClose - function to be called when the modal is closed
 * @children - the children to be displayed in the modal
 */
const Modal = (props) => {



  // it will render our model under the element having id as modal-root
  // component is comming in props as a children of Modal component which is basically a form 
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
