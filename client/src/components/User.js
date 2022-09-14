import React from "react";

export default function User({username, blogs}){
    return(<>
    <tr>
        <td>{username}</td>
        <td>{blogs}</td>
    </tr>
    </>)
}