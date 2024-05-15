import { Button, Form, Offcanvas } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { OCAuthModel, logout } from "../../redux/slice/authslice";
import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import tokenAxios from "../../hooks/tokenAxios";
const Header = () => {
  const user = useAppSelector((state) => state.loginReducers.user);
  const dispatch = useAppDispatch();

  const mutation = useMutation({
    mutationFn: async () => {
      return await tokenAxios.post('/logout')
    },
    onSuccess: (res) => {
      if(res.status===200 ){

        dispatch(logout());
      }
    },
    onError:(err)=>{
      console.log(err);
    }
  })
  return (
    <>
      <Navbar expand={"md"} bg="primary" className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#" className="text-light">
            CVSYNK
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"md"}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${"md"}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${"md"}`}
            placement="end"
          >
            <Offcanvas.Body>
              {/* <Form className="d-flex  p-0">
                <Form.Control */}
                  {/* type="text"
                  className="ms-5 rounded-0 rounded-start-1 bg-light"
                /> */}
                {/* <div className="bg-light text-secondary rounded-0 rounded-end-1  rounded-left  p-1">
                  <Button className="">search</Button>
                </div> */}
              {/* </Form> */}
              <>
                {user ? (
                  <Nav className="d-flex align-items-center  justify-content-end flex-grow-1 pe-3 text-light gap-4">
                    <NavLink
                      className="text-black "
                      style={({ isActive }) => {

                        return {
                          textDecoration: isActive ? "underline" : "none",
                        };
                      }}
                      to="/"
                    >
                      Home
                    </NavLink>

                    <NavLink
                      className="text-black "
                      style={({ isActive }) => {
                        return {
                          textDecoration: isActive ? "underline" : "none",
                        };
                      }}
                      to="/post"
                    >
                      Post
                    </NavLink>
                    <NavLink
                      className="text-black "
                      style={({ isActive }) => {
  

                        return {
                          textDecoration: isActive ? "underline" : "none",
                        };
                      }}
                      to="/profile"
                    >
                      Profile
                    </NavLink>

                    <NavLink
                      className="text-black "
                      style={({ isActive }) => {
                        return {
                          textDecoration: isActive ? "underline" : "none",
                        };
                      }}
                      to="/jobs"
                    >
                      Jobs
                    </NavLink>
                    <NavLink
                      className="text-black text-decoration-none "
                      onClick={() => {
                        mutation.mutate();
                      }}
                      to={""}
                    >
                      Logout
                    </NavLink>
                  </Nav>
                ) : (
                  <Nav className="d-flex align-items-center  justify-content-end flex-grow-1 pe-3 text-light gap-4">
                      <NavLink
                      className="text-black "
                      style={({ isActive }) => {
                        console.log(isActive);

                        return {
                          textDecoration: isActive ? "underline" : "none",
                        };
                      }}
                      to="/"
                    >
                      Home
                    </NavLink>
                    <Nav.Link
                      onClick={() => {
                        dispatch(OCAuthModel());
                      }}
                      className="text-black border-dark"
                    >
                      login
                    </Nav.Link>
                  </Nav>
                )}
              </>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
