import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    toggleLikes(state, action) {
      const blogId = action.payload.blogId;
      const newLikes = action.payload.newLikes;
      const blogToChange = state.find((b) => b.id === blogId);
      const changedBlog = {
        ...blogToChange,
        likes: newLikes,
      };
      return state.map((blog) => (blog.id !== blogId ? blog : changedBlog));
    },
    deleteBlog(state, action) {
      const blogId = action.payload;
      return state.filter((b) => b.id !== blogId);
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};



export const { toggleLikes, deleteBlog, setBlogs, appendBlog } =  blogSlice.actions;
export default blogSlice.reducer;
