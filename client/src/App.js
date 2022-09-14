import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import userService from "./services/users"
import Notification from "./components/Notification";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Users from "./components/Users";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData(){
      const loggedUserJSON = window.localStorage.getItem("loggedInUser");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
        console.log(user);
        blogService.setToken(user.token);
      }
      const allUsers = await userService.getUsers();
      setUsers(allUsers);
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
    }
    fetchData();
    console.log(users)
  }, [setUser, setBlogs, setUsers]);

  return (
    <Router>
      <Navigation
        user={user}
        setUser={setUser}
        setNotificationMessage={setNotificationMessage}
      />
      <Notification message={notificationMessage} />
      <Routes>
        {/* <Route path="/notes" element={<Notes />} /> */}
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
      {/* {user === null ? (
        <h1>Hello, best log in</h1>
      ) : (
        <>
          <Togglable buttonLabel="New Blog">
            <BlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              setNotificationMessage={setNotificationMessage}
            />
          </Togglable>

          <BlogList user={user} blogs={blogs} setBlogs={setBlogs} />
        </>
      )} */}
    </Router>
  );
};

export default App;
