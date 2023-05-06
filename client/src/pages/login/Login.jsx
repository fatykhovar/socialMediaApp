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
      setErr(err.response.data);
    }

  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Login.</h1>
          <p>
            Приложение для ведения блога.
          </p>
          <span>Еще не зарегистрированы?</span>
          <Link to="/register">
            <button>Зарегистрироваться</button>
          </Link>
        </div>
        <div className="right">
          <h1>Войти</h1>
          <form>
            <input
              type="text"
              placeholder="Логин"
              name="login"
              // onChange={(event) => {
              //   setLogin(event.target.value);
              // }}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Пароль"
              name="password"
              // onChange={(event) => {
              //   setPassword(event.target.value);
              // }}
              onChange={handleChange}
            />
            {err && err === "Invalid login or password!" ? (
              <div className="error">
                <span>Неверный логин или пароль.</span>
              </div>
            ) : (
              <></>
            )
            }
            <button onClick={handleLogin}>Войти</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;