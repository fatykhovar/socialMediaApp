import "./leftBar.css";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import React from 'react';
import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Groups';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { Link } from "react-router-dom";

const LeftBar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <div className="item">
              <Link
                to={`/profile/${currentUser.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                src={"/upload/" +currentUser.profilepic}
                alt=""/>
                <span className="name">{currentUser.name}</span>
              </Link>
            </div>
          </div>
          <div className="item">
            <Link
              to={`/`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <NewspaperIcon/>
              <span>Новости</span>
            </Link>
          </div>
          <div className="item">
            <Link
              to={`/friends`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <GroupIcon/>
              <span>Друзья</span>
            </Link>
          </div>
          <div className="item">
            <Link
              to={`/groups`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <GroupsIcon/>
              <span>Сообщества</span>
            </Link>
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