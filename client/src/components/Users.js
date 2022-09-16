import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
const Users = ({ users }) => {

    const padding = {
        padding: 5
      }

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
            <tr key={user.id}>
              <td><Link style={padding} to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Users;
