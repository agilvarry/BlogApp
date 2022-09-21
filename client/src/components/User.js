import React from "react";
import BlogList from "./BlogList";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function User() {
  const id = useParams().id;
  const user = useSelector((state) => state.userList.id === id);

  return (
    <>
      <h1>{user.username}</h1>
      <BlogList id={id} />
    </>
  );
}
