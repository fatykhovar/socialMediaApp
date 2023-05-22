import Post from "../post/Post";
import "./posts.css";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import React  from 'react';
import { AuthContext } from "../../context/authContext";
import { useContext, useState , useEffect } from "react";
import { useInfiniteScroll } from 'react-infinite-scroll-hook';

const Posts = ({ userId, feedMode }) => {
  const { currentUser } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [data, setData] = useState([]);

  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get(`/posts?userId=${userId}&currentUserId=${currentUser.id}&page=${page}`).then((res) => {
      const filteredData = res.data.rows.filter(
        (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
      );
      // setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      // setHasMore(res.data.rows.length > 0);
      return filteredData;
    })
  );

  // const loadPosts = async (page) => {
  //    try {
  //     const res = await makeRequest.get(
  //       `/posts?userId=${userId}&currentUserId=${currentUser.id}&page=${page}`
  //     );
  //     const newPosts = res.data.rows.filter(
  //       (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
  //     );
  //     setData((prevData) => [...prevData, ...newPosts]);
  //     setHasMore(res.data.rows.length > 0);
  //     setIsLoading(false);
  //   } catch (error) {
  //     setError(error);
  //   }
  // };

  // useEffect(() => {
  //   loadPosts(1);
  // }, []);

  // useInfiniteScroll({
  //   loading: isLoading,
  //   hasNextPage: hasMore,
  //   onLoadMore: async () => {
  //     setPage((prevPage) => prevPage + 1);
  //   },
  // });


  return (
    <div className="posts">
      {error
        ? "Posts Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => <Post post={post} key={post.id} />)}
        {/* <div className="loading">Loading...</div> */}
    </div>
  );
};

export default Posts;