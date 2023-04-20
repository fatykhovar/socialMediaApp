// import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
// import Post from "../../components/post/Post"
import Share from "../../components/share/Share"
import "./home.css"
import React  from 'react';

const Home = () => {
  return (
    <div className="home">
      {/* <Stories/> */}
      <Share/>
      <Posts/>
    </div>
  )
}

export default Home