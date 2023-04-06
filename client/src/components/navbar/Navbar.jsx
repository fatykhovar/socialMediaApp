import "./Navbar.css";
import React, { Component }  from 'react';
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
// import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from '@mui/icons-material/Search';
// import LogoutIcon from "@mui/icons-material/Logout";
// import { Link, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { DarkModeContext } from "../../context/darkModeContext";
// import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  // const { toggle, darkMode } = useContext(DarkModeContext);
  // const { currentUser, logout } = useContext(AuthContext);

  // const navigate = useNavigate();

  // const hanleClick = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await logout();
  //     navigate("/login");
  //   } catch (err) {
  //     console.log("Logout failed with error:" + err);
  //   }
  // };

  return (
    <div className="navbar">
      <div className="left">
          <span>SocialNetwork</span>
          <a href="/upload">Создать пост</a>
          <a href="/profile">Мой профиль</a>
          {/* <SearchIcon /> */}
      </div>
      <div className="right">
          <a href="/register">Зарегистрироваться</a>
          <a href="/login">Войти</a>
          <a href="/logout" >Выйти</a>
      </div>
    </div>
  );
};

export default Navbar;