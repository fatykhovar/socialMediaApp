// import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
// import Post from "../../components/post/Post"
import Share from "../../components/share/Share"
import "./home.css"
import React  from 'react';
import RightBar from "../../components/rightBar/RightBar";

const Home = () => {
  return (
    <div className="home col-12 col-md-2">
      {/* <Stories/> */}
      {/* <RightBar/> */}
      <Share/>
      <Posts/>
    </div>
  )
}

export default Home