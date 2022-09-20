import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import userService from "./services/users";
import Notification from "./components/Notification";
import Navigation from "./components/Navigation";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import Home from "./components/Home";
import Users from "./components/Users";
import User from "./components/User";
import BlogView from "./components/BlogView";
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch()
  
  // const [blogs, setBlogs] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  async function fetchData() {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      
      blogService.setToken(user.token);
    }
    const allUsers = await userService.getUsers();
    setUsers(allUsers);
    dispatch(initializeBlogs());  
  }

  useEffect(() => {
    fetchData();
  }, [setUser, dispatch, setUsers]);

  const blogs = useSelector(state => state.blogs);
  
  const userMatch = useMatch("/users/:id");
  const selectedUser = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null;

  const blogMatch = useMatch("blogs/:id")
  const selectedBlog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
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
        <Route path="/users/:id" element={<User selectedUser={selectedUser} user={user} />} />
        <Route path="/blogs/:id" element={<BlogView selectedBlog={selectedBlog}  user={user}/>} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/"element={<Home setNotificationMessage={setNotificationMessage}user={user}/>} />
      </Routes>
    </>
  );
};

export default App;
