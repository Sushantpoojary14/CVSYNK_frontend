import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Login from "./login/Login";
import Register from "./register/Register";
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {OCAuthModel} from "../../redux/slice/authslice";
const Auth = () => {
  const show = useAppSelector((state)=>state.authReducer.value);
  const dispatch = useAppDispatch()
  const [tab, setTab] = useState<number>(0);


  return (
    <>
      <Button variant="primary" onClick={()=>dispatch(OCAuthModel())}>
        Launch demo modal
      </Button>

      <Modal
        show={show}
        onHide={()=>dispatch(OCAuthModel())}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {tab == 0 ? "Login" : "register"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{tab == 0 ?<Login/> : <Register/>}</Modal.Body>
       
      </Modal>
    </>
  );
};

export default Auth;
