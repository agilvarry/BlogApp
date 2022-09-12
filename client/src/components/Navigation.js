import React, { useState } from "react";
import { Button, NavDropdown, Navbar, Container } from "react-bootstrap";
import LoginForm from "./LoginForm";
import NewUserForm from "./NewUserForm";

const Navigation = ({ user, setUser, setNotificationMessage }) => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [newVisible, setNewVisible] = useState(false);
  

  const logOut = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <>
        <div style={hideWhenVisible}>
          <Button
            size="sm"
            variant="success"
            onClick={() => setLoginVisible(true)}
          >
            log in{" "}
          </Button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm setUser={setUser}  setNotificationMessage={setNotificationMessage}/>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setLoginVisible(false)}
          >
            cancel
          </Button>
        </div>
      </>
    );
  };
  const newUserForm = () => {
    const hideWhenVisible = { display: newVisible ? "none" : "" };
    const showWhenVisible = { display: newVisible ? "" : "none" };

    return (
      <>
        <div style={hideWhenVisible}>
          <Button
            size="sm"
            variant="primary"
            onClick={() => setNewVisible(true)}
          >
            create user
          </Button>
        </div>
        <div style={showWhenVisible}>
          <NewUserForm
            setUser={setUser}
          />
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setNewVisible(false)}
          >
            Cancel
          </Button>
        </div>
      </>
    );
  };
  const logInOrCreate = () => {
    const hideLogIn = { display: newVisible ? "none" : "" };
    const hideNewUser = { display: loginVisible ? "none" : "" };

    return (
      <>
        <Container style={hideLogIn}>{loginForm()}</Container>
        <Container style={hideNewUser}>{newUserForm()}</Container>
      </>
    );
  };

  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand>Blogs Collection</Navbar.Brand>
      </Container>
      {user === null ? (
        <Container>
          <Navbar.Collapse className="justify-content-end">
            <NavDropdown autoClose="outside" align="end" title="Log In">{logInOrCreate()}</NavDropdown>
          </Navbar.Collapse>
        </Container>
      ) : (
        <>
          <Container>
            <Navbar.Collapse className="justify-content-end">
              <Button size="sm" variant="secondary" onClick={() => logOut()}>
                Log Out {user.username}
              </Button>
            </Navbar.Collapse>
          </Container>
        </>
      )}
    </Navbar>
  );
};

export default Navigation;
