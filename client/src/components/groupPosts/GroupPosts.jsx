import GroupPost from "../groupPost/GroupPost";
import "./groupPosts.css";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import React  from 'react';

const GroupPosts = ({ groupId }) => {
  const { isLoading, error, data } = useQuery(["groupPosts"], () =>
    makeRequest.get("/groupPosts?groupId=" + groupId).then((res) => {
      const filteredData = res.data.rows.filter(
        (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
      );
      return filteredData;
    })
  );

  return (
    <div className="groupPosts">
      
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => <GroupPost post={post} key={post.id} />)}
    </div>
  );
};

export default GroupPosts;