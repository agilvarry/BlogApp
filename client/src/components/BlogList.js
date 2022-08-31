import React from "react";
import Blog from "../components/Blog";

const BlogList = ({ blogs, setBlogs }) => {
  blogs.sort((a,b) => {
    return b.likes-a.likes;
  })
  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
      ))}
    </>
  );
};

export default BlogList;
