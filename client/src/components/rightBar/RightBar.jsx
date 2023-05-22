import "./rightBar.css";
import React from 'react';
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const RightBar = () => {

  const {feedMode, setFriendsFeedMode, setGroupsFeedMode, isHome} = useContext(AuthContext);

  const handleFriendsClick = () => {
    setFriendsFeedMode();
    // authContextValue.feedMode = "friends";
    // console.log("authValue: ", feedMode)
  };

  const handleGroupsClick = () => {
    setGroupsFeedMode()
    // authContextValue.feedMode = "groups";
  };

  console.log("feedMode: ", feedMode);
  return (
    <div className="rightBar col-12 col-md-12">
      <div className="container">
        {isHome ? (
          <div className="item">
            <span>Параметры поиска</span>
            <div className="user">
              <button onClick={handleFriendsClick}>Друзья</button>
            </div>
            <div className="user">
              <button onClick={handleGroupsClick}>Сообщества</button>
            </div>
          </div>
        ) : (
          <div className="item">
   
          </div>
        )}
        
      </div>
    </div>
  );
};

export default RightBar;