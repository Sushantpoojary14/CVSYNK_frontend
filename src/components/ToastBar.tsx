import React from "react";
import Toast from "react-bootstrap/Toast";
const ToastBar = ({
  close,
  show,
  type,
  message,
}: {
  close: any;
  show: boolean;
  type: string;
  message:string;
}) => {
  return (
    <Toast onClose={close} show={show} delay={4000} autohide bg={type}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default ToastBar;
