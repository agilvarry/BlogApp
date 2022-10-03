import React from "react";
import Blog from "../components/Blog";
import { useSelector } from 'react-redux';
const BlogList = ({ id }) => {
  const blogs = useSelector(state => state.blogs);
  const selectedBlogs = id ? blogs.filter((b) => b.user === id) : blogs;
  const sort = selectedBlogs.slice();
  const sorted = sort.sort((a,b) => {
    return b.likes.length-a.likes.length;
  });

  return (
    <>
      {sorted.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </>
  );
};

export default BlogList;
