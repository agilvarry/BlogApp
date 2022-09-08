import React from "react";
import Blog from "../components/Blog";

const BlogList = ({ user, blogs, setBlogs }) => {
  blogs.sort((a,b) => {
    return b.likes.length-a.likes.length;
  })
  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} user={user} blog={blog} blogs={blogs} setBlogs={setBlogs} />
      ))}
    </>
  );
};

export default BlogList;
