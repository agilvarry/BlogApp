import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({
  blogs,
  setBlogs,
  setNotificationMessage
}) => {
    const [newBlogTitle, setNewBlogTitle] = useState("");
    const [newBlogAuthor, setNewBlogAuthor] = useState("");
    const [newBlogURL, setNewBlogURL] = useState("");

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value);
  };
  const handleURLChange = (event) => {
    setNewBlogURL(event.target.value);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL,
    };
    try {
      const returnedBlog = await blogService.create(blogObject);

      setBlogs(blogs.concat(returnedBlog));
      setNewBlogTitle("");
      setNewBlogAuthor("");
      setNewBlogURL("");
      setNotificationMessage("Added blog");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch (e) {
      setNotificationMessage(e);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  return (
    <>
      <form onSubmit={addBlog}>
        <label htmlFor="title">Title</label>
        <input value={newBlogTitle} id="title" onChange={handleTitleChange} />
        <label htmlFor="author">Author</label>
        <input
          value={newBlogAuthor}
          id="author"
          onChange={handleAuthorChange}
        />
        <label htmlFor="url">URL</label>
        <input value={newBlogURL} id="url" onChange={handleURLChange} />
        <button type="submit">save</button>
      </form>
    </>
  );
};

export default BlogForm;
