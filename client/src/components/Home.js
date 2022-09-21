import React from "react";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";
import Togglable from "../components/Toggleable";
import {  useSelector } from 'react-redux';

const Home = () => {
 
  const user = useSelector(state => state.user);
   
  return (
    <>
      {user === null ? (
        <h1>Hello, best log in</h1>
      ) : (
        <>
          <Togglable buttonLabel="New Blog">
            <BlogForm  />
          </Togglable>

          <BlogList id={null}  />
        </>
      )}
    </>
  );
};

export default Home;
