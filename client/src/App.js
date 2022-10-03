import { useEffect } from "react";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Navigation from "./components/Navigation";
import { Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Users from "./components/Users";
import User from "./components/User";
import BlogView from "./components/BlogView";
import { useDispatch } from 'react-redux';
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser } from './reducers/userReducer';
import { initializeUserList } from './reducers/userListReducer';
import BlogForm from "./components/BlogForm";
const App = () => {
  const dispatch = useDispatch();

  

  useEffect(() => {
    async function fetchData() {
      const loggedUserJSON = window.localStorage.getItem("loggedInUser");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        dispatch(setUser(user));
        
        blogService.setToken(user.token); //TODO: move into a reducer?
      }
      dispatch(initializeUserList());
      dispatch(initializeBlogs());  
    }

    fetchData();

  }, [dispatch]);

  return (
    <>
      <Navigation  />
      <Notification  />
      <Routes>
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route path = "/blogs/new" element={<BlogForm />} />
        <Route path="/users" element={<Users />} />
        <Route path="/"element={<Home  />} />
      </Routes>
    </>
  );
};

export default App;
