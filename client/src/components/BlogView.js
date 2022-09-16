import React from "react";

import {useParams} from 'react-router-dom';

export default function BlogView({ selectedBlog, user }){
    const id = useParams().id
    
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
    return(<>
        <h1>{selectedBlog.title}</h1>
        <h2>{selectedBlog.author}</h2>
        <p>{selectedBlog.content}</p>
    </>);
}