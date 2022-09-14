import React from "react";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";
import Togglable from "../components/Toggleable";

const Home = ({user, blogs, setBlogs, setNotificationMessage}) => {
  return (
    <>
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

          <BlogList user={user} blogs={blogs} setBlogs={setBlogs} />
        </>
      )}
    </>
  );
};

export default Home;
