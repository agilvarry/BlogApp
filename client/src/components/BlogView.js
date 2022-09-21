import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BlogView({}) {
  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((b) => b.id === id);

  return (
    <>
      {blog ? (
        <>
          <h1>{blog.title}</h1>
          <h2>{blog.author}</h2>
          <p>{blog.content}</p>
        </>
      ) : (
        <p>no blog</p>
      )}
    </>
  );
}
