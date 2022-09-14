import React from "react";
import { Table } from "react-bootstrap";

const Users = ({ users }) => {
  return (
    <>
      <h1>Users</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>username</th>
            <th>Blogs Published</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Users;
