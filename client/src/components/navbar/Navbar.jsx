import "./Navbar.css";
import React, { Component }  from 'react';
import { useEffect, useState } from "react";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
// import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from '@mui/icons-material/Search';
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
// import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const {currentUser, logout} = useContext(AuthContext);
  console.log(currentUser);

  const handleSearch =  (e) =>{
    console.warn(e.target.value);
  }


  const hanleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      // navigate("/login");
    } catch (err) {
      console.log("Logout failed with error:" + err);
    }
  };

  return (
    <div className="navbar">
      {currentUser ? (
        <>
          <div className="left">
            <a href="/">
              <span>SocialNetwork</span>
            </a>
              {/* <a href="/profile">Мой профиль</a> */}
              
              {/* <SearchIcon /> */}
          </div>
          <div className="right">
            <div className="search">
              <SearchOutlinedIcon />
              <input type="text" placeholder="Поиск..." onChange={handleSearch} />
            </div>
            <div className="user">
              <a href={"/profile/" + currentUser.id }>
                <PersonOutlinedIcon/>
              </a>
            </div> 
              <a href={"/login"}>
                <LogoutIcon onClick={hanleLogout} />
              </a>
          </div>
        </>
      ) : (
        <>
          <div className="left">
              <span>SocialNetwork</span>
          </div>
          <div className="right">
              <a href="/register">Зарегистрироваться</a>
              <a href="/login">Войти</a>
              {/* <a href="/logout" >Выйти</a> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;