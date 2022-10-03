import React from "react";
import blogService from "../services/blogs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleLikes } from '../reducers/blogReducer'

export default function BlogView({}) {
  const id = useParams().id;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((b) => b.id === id);
  

  const toggleLike = async () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      content: blog.content,
      likes: blog.likes,
    };
    try {
      const res = await blogService.update(blog.id, blogObject);
      dispatch(toggleLikes({blogId: blog.id, newLikes: res.likes}))

    } catch (e) {
      console.log("error updating blog");
      console.log(e);
    }
  };

  return (
    <>
      {blog ? (
        <>
          <h1>{blog.title}</h1>
          <h2>{blog.author}</h2>
          <p>{blog.content}</p>
          <button onClick={toggleLike}>
          {blog.likes.includes(user.id) ? "unlike" : "like"}
        </button>
        </>
      ) : (
        <p>no blog</p>
      )}
    </>
  );
}
