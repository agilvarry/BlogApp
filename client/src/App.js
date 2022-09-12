import { useState, useEffect } from "react";

import blogService from "./services/blogs";

import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Togglable from "./components/Toggleable";
import Navigation from "./components/Navigation";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      console.log(user);
      blogService.setToken(user.token);
    }

    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [setUser]);

  return (
    <>
      <Navigation user={user} setUser={setUser} setNotificationMessage={setNotificationMessage} />

      <Notification message={notificationMessage} />
      {user === null ? (
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

          <BlogList user = {user} blogs={blogs} setBlogs={setBlogs}/>
        </>
      )}
    </>
  );
};

export default App;
