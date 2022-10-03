import { useState } from "react";
import blogService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { appendBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import {Button} from 'react-bootstrap';
const BlogForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  console.log(user)
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogContent, setNewBlogContent] = useState("");

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setNewBlogContent(event.target.value);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: newBlogTitle,
      author: user.username,
      content: newBlogContent,
    };
    try {
      const returnedBlog = await blogService.create(blogObject);
      dispatch(appendBlog(returnedBlog));

      setNewBlogTitle("");
  
      setNewBlogContent("");
      dispatch(setNotification("Added Blog"));
      setTimeout(() => {
        dispatch(setNotification(null));
      }, 5000);
    } catch (e) {
      dispatch(setNotification(e));
      setTimeout(() => {
        dispatch(setNotification(null));
      }, 5000);
    }
  };

  return (
    <div style={{display: "flex",justifyContent: "center", flexDirection: "column"}}>
      <div>
    <h1>New Blog</h1>
      <form onSubmit={addBlog}>
        <label htmlFor="title">Title</label><br />
        <input value={newBlogTitle} id="title" onChange={handleTitleChange} /><br />
        <label htmlFor="content">Content</label><br />
        <textarea
          value={newBlogContent}
          id="content"
          onChange={handleContentChange}
        /><br />
        <Button type="submit">save</Button>
      </form>
      </div>
    </div>
  );
};

export default BlogForm;
