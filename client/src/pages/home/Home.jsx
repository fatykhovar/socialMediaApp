import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.css"
import React  from 'react';
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import GroupPosts from "../../components/groupPosts/GroupPosts";

const Home = () => {
  const {feedMode, setIsHome} = useContext(AuthContext);

  setIsHome(true);
  return (
    <div className="home col-12 col-md-2">
      <Share/>
      {/* <Posts/> */}
      {feedMode == "friends" ? (
        <Posts />
      ) : (
        <GroupPosts />
      )}
      
    </div>
  )
}

export default Home