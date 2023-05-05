import "./friend.css";
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import ImageIcon from '@mui/icons-material/Image';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import React  from 'react';
import { Link } from "react-router-dom";

const Friend = ({user}) => {

  return (
    <div className="friend">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={"/upload/" + user.profilepic} alt="" />
            <Link
                to={`/profile/${user.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
              {console.log("user: ", user)}
              <span className="name">{user.name}</span>
            </Link>
          </div>
           {/* <div className="right">
            <button
            //  onClick={handleClick}
             >Подписаться</button>
          </div> */}
        </div>
        <hr />
        <div className="bottom">
         
        </div>
      </div>
    </div>
  );
};

export default Friend;