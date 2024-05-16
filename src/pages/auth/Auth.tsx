import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Login from "./login/Login";
import Register from "./register/Register";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { OCAuthModel } from "../../redux/slice/authslice";
import { Nav } from "react-bootstrap";
const Auth = () => {
  const show = useAppSelector((state) => state.authReducer.value);
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState<string>("1");

  return (
    <>
      {/* <Button variant="primary" onClick={() => { dispatch(OCAuthModel())}}>
        login
      </Button> */}
    
      <Modal
        show={show}
        onHide={() => dispatch(OCAuthModel())}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <Nav fill variant="tabs" defaultActiveKey={tab}>
              <Nav.Item>
                <Nav.Link eventKey="1" onClick={()=>setTab("1")}>Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="2" onClick={()=>setTab("2")}>Register</Nav.Link>
              </Nav.Item>
            </Nav>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{tab === "1" ? <Login /> : <Register />}</Modal.Body>
      </Modal>
    </>
  );
};

export default Auth;
