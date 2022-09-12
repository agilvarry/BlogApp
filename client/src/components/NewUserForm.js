import React, { useState } from "react";
import userService from "../services/users";
import loginService from "../services/login";
import {Form, Button} from 'react-bootstrap';
const NewUserForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      await userService.create({
        username,
        password,
      });

      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);

     
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <Form onSubmit={handleCreate}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder="username" type="text" value={username} name="Username" onChange={handleUsernameChange}/>

        <Form.Label>Password</Form.Label>
        <Form.Control placeholder="username" type="password" value={password} name="Password" onChange={handlePasswordChange} />
      </Form.Group>
      <Button variant="primary" size="sm" type="submit">Create and Login</Button>
    </Form>
  );
};

export default NewUserForm;
