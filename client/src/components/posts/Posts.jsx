import Post from "../post/Post";
import "./posts.css";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import React  from 'react';

const Posts = ({ userId }) => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userId=" + userId).then((res) => {
        console.log("posts res: ", res);
      const filteredData = res.data.rows.filter(
        (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
      );
      return filteredData;
    })
    // makeRequest.get("/posts").then((res) => {
    //     return res.data;
    //   })
  );

  return (
    <div className="posts">
      
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;