import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({
  blogs,
  setBlogs,
  setNotificationMessage
}) => {
    const [newBlogTitle, setNewBlogTitle] = useState("");
    const [newBlogAuthor, setNewBlogAuthor] = useState("");
    const [newBlogContent, setNewBlogContent] = useState("");

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value);
  };
  const handleContentChange = (event) => {
    setNewBlogContent(event.target.value);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      content: newBlogContent,
    };
    try {
      const returnedBlog = await blogService.create(blogObject);

      setBlogs(blogs.concat(returnedBlog));
      setNewBlogTitle("");
      setNewBlogAuthor("");
      setNewBlogContent("");
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
        <label htmlFor="content">Content</label>
        <input value={newBlogContent} id="content" onChange={handleContentChange} />
        <button type="submit">save</button>
      </form>
    </>
  );
};

export default BlogForm;
