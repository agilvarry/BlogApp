import React from "react";

import {useParams} from 'react-router-dom';

export default function BlogView({ selectedBlog, user }){
    const id = useParams().id

    return(<>
        <h1>{selectedBlog.title}</h1>
        <h2>{selectedBlog.author}</h2>
        <p>{selectedBlog.content}</p>
    </>);
}