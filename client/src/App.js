import { useState, useEffect } from "react";

import blogService from "./services/blogs";

import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Toggleable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }

    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [setUser]);

  const logOut = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <>
      <h2>BlogsApp</h2>
      <Notification message={notificationMessage} />
      {user === null ? (
        <LoginForm
          setUser={setUser}
          setNotificationMessage={setNotificationMessage}
        />
      ) : (
        <>
          <div>
            <p>
              {user.name} logged-in <button onClick={logOut}>Log Out</button>
            </p>
          </div>
          <Togglable buttonLabel="New Blog">
            <BlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              setNotificationMessage={setNotificationMessage}
            />
          </Togglable>

          <BlogList logout={() => logOut()} blogs={blogs} setBlogs={setBlogs}/>
        </>
      )}
    </>
  );
};

export default App;
