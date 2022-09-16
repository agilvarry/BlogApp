import React from "react";
import Blog from "../components/Blog";

const BlogList = ({ user, blogs, id, setBlogs }) => {

  const selectedBlogs = id ? blogs.filter((b) => b.user.id === id) : blogs;
  selectedBlogs.sort((a, b) => {
    return b.likes.length - a.likes.length;
  });
  return (
    <>
      {selectedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
        />
      ))}
    </>
  );
};

export default BlogList;
