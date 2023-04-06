import './App.css';
import Navbar from './components/navbar/Navbar';
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React, { Component }  from 'react';

function App() {
  return (
    <>
      <Navbar /> 
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/register"  element={<Register />} />
          <Route path="/login"  element={<Login />} />
          {/*<Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} /> */}
        </Routes>
     </Router> 
    </>
  );
}

export default App;
