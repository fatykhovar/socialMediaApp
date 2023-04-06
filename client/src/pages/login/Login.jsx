import { useContext, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
// import { AuthContext } from "../../context/authContext";
import React  from 'react';
import "./login.css";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  //const navigate = useNavigate();
  //const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleChange = (e) => {
  //   setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // const { currentUser, login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    // e.preventDefault();
    // try {
    //   const res = await login(inputs);
    //   //navigate("/");
    // } catch (err) {}
  };

  // if (currentUser) {
  //   return <Navigate to="/" />;
  // }
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Buckety Login.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Зарегистрироваться</button>
          </Link>
        </div>
        <div className="right">
          <h1>Войти</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleLogin}>Войти</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;