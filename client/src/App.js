import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import userService from "./services/users";
import Notification from "./components/Notification";
import Navigation from "./components/Navigation";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import Home from "./components/Home";
import Users from "./components/Users";
import User from "./components/User";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedBlogs, setSelectedBlogs] = useState(null)
  async function fetchData() {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      
      blogService.setToken(user.token);
    }
    const allUsers = await userService.getUsers();
    setUsers(allUsers);
    const allBlogs = await blogService.getAll();
    setBlogs(allBlogs);
    
  }

  useEffect(() => {
    fetchData();
  }, [setUser, setBlogs, setUsers]);
  
  const userMatch = useMatch("/users/:id");
  const selectedUser = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null;
  
  return (
    <>
      <Navigation
        user={user}
        setUser={setUser}
        setNotificationMessage={setNotificationMessage}
      />
      <Notification message={notificationMessage} />
      <Routes>
        <Route path="/users/:id" element={<User selectedUser={selectedUser} blogs={blogs} user={user} setBlogs={setBlogs}/>} />
        <Route path="/users" element={<Users users={users} />} />
        <Route
          path="/"
          element={
            <Home
              blogs={blogs}
              setBlogs={setBlogs}
              setNotificationMessage={setNotificationMessage}
              user={user}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
