import "./leftBar.css";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import React from 'react';
import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Groups';
import NewspaperIcon from '@mui/icons-material/Newspaper';

const LeftBar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={"/upload/" +currentUser.profilepic}
              alt=""
            />
            <span>{currentUser.name}</span>
          </div>
          <div className="item">
            <a href={"/"} >
              <NewspaperIcon/>
            </a>
            <span>Новости</span>
          </div>
          <div className="item">
            <GroupIcon/>
            <span>Друзья</span>
          </div>
          <div className="item">
            <a href={"/groups"} >
              <GroupsIcon/>
            </a>
            <span>Сообщества</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          {/* <span>Your shortcuts</span> */}
        </div>
        <hr />
        <div className="menu">
          {/* <span>Others</span> */}
          
        </div>
      </div>
    </div>
  );
};

export default LeftBar;