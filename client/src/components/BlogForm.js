import { useState } from "react";
import blogService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { appendBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
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
    <>
      <form onSubmit={addBlog}>
        <label htmlFor="title">Title</label>
        <input value={newBlogTitle} id="title" onChange={handleTitleChange} />
        {/* <label htmlFor="author">Author</label> */}
        {/* <input
          value={newBlogAuthor}
          id="author"
          onChange={handleAuthorChange}
        /> */}
        <label htmlFor="content">Content</label>
        <input
          value={newBlogContent}
          id="content"
          onChange={handleContentChange}
        />
        <button type="submit">save</button>
      </form>
    </>
  );
};

export default BlogForm;
