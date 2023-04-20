import { useContext, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";
import React  from 'react';
import axios from "axios";
import "./login.css";

const Login = () => {
  const [inputs, setInputs] = useState({
    login: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();
  //const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { currentUser, login} = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(inputs);
      navigate("/");
    } catch (err) {
      // setErr(err.response.data);
    }

  };
  // const [login, setLogin] = useState("");
  // const [password, setPassword] = useState("");

  // const [errorMessage, setErrorMessage] = useState("");

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post("http://localhost:3001/api/auth/register", {
  //           login: login,
  //           password: password,
  //         })
  //       .then((response) => {
  //               if (response.data.loggedIn) {
  //                 localStorage.setItem("loggedIn", true);
  //                 localStorage.setItem("login", response.data.login);
  //                 navigate("/");
  //               }
  //               else {
  //                 setErrorMessage(response.data.message);
  //               }
  //             })
  //   } catch (errorMessage) {
  //     console.log(errorMessage);
  //     setErrorMessage(errorMessage);
  //   }
  // };

  // const handleLogin = () => {
  //   Axios.post("http://localhost:3001/api/auth/login", {
  //     login: login,
  //     password: password,
  //   })
  //   .then((response) => {
  //     if (response.data.loggedIn) {
  //       localStorage.setItem("loggedIn", true);
  //       localStorage.setItem("login", response.data.login);
  //       navigate("/");
  //     } else {
  //       setErrorMessage(response.data.message);
  //     }
  //     console.log(response);
  //   });
  // };
  // console.log(currentUser);

  // if (loggedIn) {
  //     return <Navigate to="/" />;
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
              placeholder="Login"
              name="login"
              // onChange={(event) => {
              //   setLogin(event.target.value);
              // }}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              // onChange={(event) => {
              //   setPassword(event.target.value);
              // }}
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