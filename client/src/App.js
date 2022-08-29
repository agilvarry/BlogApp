import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogURL, setNewBlogURL] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      setUser(user);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotificationMessage("Wrong credentials");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      {" "}
      <div>
        {" "}
        username{" "}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />{" "}
      </div>{" "}
      <div>
        {" "}
        password{" "}
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />{" "}
      </div>{" "}
      <button type="submit">login</button>{" "}
    </form>
  );

  const blogsList = () => {
    const logOut = () => {
      window.localStorage.removeItem("loggedInUser");
      setUser(null);
    };
    return (
      <>
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={() => logOut()}>Log Out</button>
        </div>

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </>
    );
  };

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL,
    };
    try{
      const returnedBlog = await blogService.create(blogObject)

      
      setBlogs(blogs.concat(returnedBlog));
      setNewBlogTitle("");
      setNewBlogAuthor("");
      setNewBlogURL("");
      setNotificationMessage("Added blog");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch (e){
      setNotificationMessage(e);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
    
  
  };

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value);
  };
  const handleURLChange = (event) => {
    setNewBlogURL(event.target.value);
  };

  const blogForm = () => {
    return (
      <>
        <form onSubmit={addBlog}>
          <label htmlFor="title">Title</label>
          <input value={newBlogTitle} id="title" onChange={handleTitleChange} />
          <label htmlFor="author">Author</label>
          <input value={newBlogAuthor} id="author" onChange={handleAuthorChange} />
          <label htmlFor="url">URL</label>
          <input value={newBlogURL} id="url" onChange={handleURLChange} />
          <button type="submit">save</button>
        </form>
      </>
    );
  };

  const LoggedIn = () => {
    return (
      <>
        {blogForm()}
        {blogsList()}
      </>
    );
  };

  return (
    <>
      <h2>BlogsApp</h2>
      <Notification message={notificationMessage} />
      {user === null ? loginForm() : LoggedIn()}
    </>
  );
};

export default App;
