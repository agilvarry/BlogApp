import React from "react";
import BlogList from "./BlogList";
import {useParams} from 'react-router-dom';

export default function User({ selectedUser, blogs, user, setBlogs }){
    const id = useParams().id

    return(<>
        <h1>{selectedUser.username}</h1>
        <BlogList user={user} id={id} blogs={blogs} setBlogs={setBlogs} />
    </>)
}