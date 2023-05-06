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
      console.log("reg err: ", err)
      setErr(err.response.data);
    }
  };

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
            <input
              type="email"
              placeholder="Эл. почта"
              name="email"
              onChange={handleChange}
            />
            {Array.isArray(err) && err.includes("Invalid email!") ? (
              <div className="error">
                <span>Неправильный адрес эл. почты.</span>
              </div>
            ) : (
              <></>
            )
            }
            <input
              type="password"
              placeholder="Пароль"
              name="password"
              onChange={handleChange}
            />
            {Array.isArray(err) && err.includes('Invalid password!') ? (
              <div className="error">
                <span>Пароль должен состоять не менее, чем из 8 символов, включать в себя цифры и не менее 2 заглавных букв.</span>
              </div>
            ) : (
              <></>
            )
            }
            <input
              type="text"
              placeholder="Имя профиля"
              name="name"
              onChange={handleChange}
            />
            {Array.isArray(err) && err.includes('Duplicate!') ? (
              <div className="error">
                <span>Такой логин или эл. почта уде существуют.</span>
              </div>
            ) : (
              <></>
            )
            }
            {Array.isArray(err) && err.includes('Empty inputs!') ? (
              <div className="error">
                <span>Заполните пустые поля.</span>
              </div>
            ) : (
              <></>
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
