import React from "react";
import Blog from "../components/Blog";
import { useDispatch, useSelector } from 'react-redux';
const BlogList = ({ id }) => {
  const blogs = useSelector(state => state.blogs);
  const selectedBlogs = id ? blogs.filter((b) => b.user === id) : blogs;

  return (
    <>
      {selectedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </>
  );
};

export default BlogList;
