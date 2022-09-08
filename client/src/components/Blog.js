import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ user, blog, blogs, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const toggleLike = async () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
    };

    try {
      const res = await blogService.update(blog.id, blogObject);
      setBlogs(blogs.map((b) => (b.id !== blog.id ? b : res)));
    } catch (e) {
      console.log("error updating blog");
      console.log(e);
    }
  };

  const removeBlog = async () => {
    try {
      if (window.confirm("Are you sure you wante to delete this blog?")) {
        await blogService.remove(blog.id);
      }
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author}
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url} <br />
        {blog.likes.length} <br />
        {blog.id}
        <button onClick={toggleLike}>
          {blog.likes.includes(user.id) ? "unlike" : "like"}
        </button>
        {blog.user.toString() === user.id.toString() && (
          <button onClick={removeBlog}>Delete</button>
        )}
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  );
};

export default Blog;
