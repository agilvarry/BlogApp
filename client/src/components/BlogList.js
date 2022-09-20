import React from "react";
import Blog from "../components/Blog";
import { useDispatch, useSelector } from 'react-redux';
const BlogList = ({ user, id }) => {
  const blogs = useSelector(state => state.blogs);
 
  const selectedBlogs = id ? blogs.filter((b) => b.user.id === id) : blogs;
  // console.log(selectedBlogs)
  // blogs.sort((a, b) => {
  //   return b.likes.length - a.likes.length;
  // });
  return (
    <>
      {selectedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
        />
      ))}
    </>
  );
};

export default BlogList;
