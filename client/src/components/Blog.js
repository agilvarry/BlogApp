import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs }) => {
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

  const addLike = async () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    try {
      console.log(blog);
      const res = await blogService.update(blog.id, blogObject);
      console.log(res);
      setBlogs(blogs.map((b) => (b.id !== blog.id ? b : res)));
    } catch (e) {
      console.log(e);
    }
  };

  const removeBlog = async () => {
    try{
      if(window.confirm("Are you sure you wante to delete this blog?")){
        await blogService.remove(blog.id);
      }
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } catch(e){
      console.log(e)
    }
    
  }

  return (
    <div style={blogStyle}>
      <strong>{blog.title} </strong> <br />
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible}>
        {blog.author} <br />
        {blog.url} <br />
        {blog.likes} <br />
        {blog.id}
        <button onClick={addLike}>Like</button>
        <button onClick={removeBlog}>Delete</button>
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  );
};

export default Blog;
