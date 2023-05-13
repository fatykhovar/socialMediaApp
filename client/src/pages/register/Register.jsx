import "./register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React from 'react';

const Register = () => {
  const [inputs, setInputs] = useState({
    login: "",
    email: "",
    password: "",
    name: "",
    // profilepic: "blank_profile.jpg",
    // coverpi: "blank_cover.jpg"
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/auth/register", inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };
  console.log("reg err: ", err)
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Social Network.</h1>
          <p>
            Приложение для ведения блога.
          </p>
          <span>Уже зарегистрированы?</span>
          <Link to="/login">
            <button>Войти</button>
          </Link>
        </div>
        <div className="right">
          <h1>Регистрация</h1>
          <form>
            <input
              type="text"
              placeholder="Логин"
              name="login"
              onChange={handleChange}
            />
            {Array.isArray(err) && err.includes("Empty login!") ? (
              <div className="error">
                <span>Введите логин.</span>
              </div>
            ) : Array.isArray(err) && err.includes("Login duplicate!") ? (
                <div className="error">
                  <span>Такой логин уже существует.</span>
                </div>
            ) : (
              <div className="error">
              </div>
            )
            }
            <input
              type="email"
              placeholder="Эл. почта"
              name="email"
              onChange={handleChange}
            />
            {Array.isArray(err) && err.includes("Empty email!") ? (
              <div className="error">
                <span>Введите эл. почту.</span>
              </div>
            ) : Array.isArray(err) && err.includes("Invalid email!") ? (
              <div className="error">
                <span>Неправильный адрес эл. почты.</span>
              </div>
            ) : Array.isArray(err) && err.includes("Email duplicate!") ? (
              <div className="error">
                  <span>Такая эл. почта уже существует.</span>
              </div>
            ):(
              <div className="error"></div>
            )
            }
            <input
              type="password"
              placeholder="Пароль"
              name="password"
              onChange={handleChange}
            />
            {Array.isArray(err) && err.includes('Empty password!') ? (
              <div className="error">
                <span>Введите пароль.</span>
              </div>
            ) : Array.isArray(err) && err.includes('Invalid password!') ? (
              <div className="error">
                <span>Пароль должен состоять не менее, чем из 8 символов, включать в себя цифры и не менее 2 заглавных букв.</span>
              </div>
            ) : (
              <div className="error"></div>
            )
            }
            <input
              type="text"
              placeholder="Имя профиля"
              name="name"
              onChange={handleChange}
            />
            {Array.isArray(err) && err.includes('Empty name!') ? (
              <div className="error">
                <span>Введите имя.</span>
              </div>
            ) : (
              <div className="error"></div>
            )
            }
            {Array.isArray(err) && err.includes('Duplicate!') ? (
              <div className="error">
                <span>Такой логин или эл. почта уже существуют.</span>
              </div>
            ) : (
              <div className="error"></div>
            )
            }
            <button onClick={handleClick}>Зарегистрировться</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
