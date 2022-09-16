import React from 'react';
import blogService from "../services/blogs";
import { Link } from 'react-router-dom'

const Blog = ({ user, blog, blogs, setBlogs }) => {
  const padding = {
    padding: 5,
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleLike = async () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      content: blog.content,
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
      <Link style={padding} to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
      
      <button onClick={toggleLike}>
          {blog.likes.includes(user.id) ? "unlike" : "like"}
        </button>
        {blog.user.toString() === user.id.toString() && (
          <button onClick={removeBlog}>Delete</button>
        )}
    </div>
  );
};

export default Blog;
