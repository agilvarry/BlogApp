import React from "react";
import { Table } from "react-bootstrap";
import User from "./User";
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
          
            {users.map((user) => <User key = {user.id} username={user.username} blogs={user.blogs.length} />)}
    
        </tbody>
      </Table>
      
    </>
  );
};

export default Users;
