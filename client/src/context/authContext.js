import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React  from 'react';

// export const AuthContext = createContext({
//   feedMode: "friends",
//   setFriendsFeedMode: () => {},
//   setGroupsFeedMode: () => {}
// });
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [isHome, setIsHome] = useState(false);

  const [feedMode, setFeedMode] = useState("friends");

  const setFriendsFeedMode = async () => {
    setFeedMode("friends");

    localStorage.setItem("feedMode", JSON.stringify("friends"));
  };

  const setGroupsFeedMode = async () => {
    setFeedMode("groups");

    localStorage.setItem("feedMode", JSON.stringify("groups"));
  };

  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:3001/api/auth/login",
      inputs,
      {
        withCredentials: true,
      }
    );
    setCurrentUser(res.data);

    localStorage.setItem("user", JSON.stringify(res.data));
  };

  const logout = async (inputs) => {
    await axios.post("http://localhost:3001/api/auth/logout");
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, feedMode, setFriendsFeedMode, setGroupsFeedMode, isHome, setIsHome}}>
      {children}
    </AuthContext.Provider>
  );
};
