import React from "react";
import BlogList from "../components/BlogList";
import {  useSelector } from 'react-redux';

const Home = () => {
 
  const user = useSelector(state => state.user);
   
  return (
    <>
      {user === null ? (
        <h1>Hello, best log in</h1>
      ) : (
        <>
          <BlogList id={null}  />
        </>
      )}
    </>
  );
};

export default Home;
