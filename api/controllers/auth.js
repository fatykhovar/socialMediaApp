import {pool} from "../pool.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function foo() {
      if( typeof foo.counter == 'undefined' ) {
        foo.counter = 0;
      }
      foo.counter++;
      return foo.counter;
    }

export const register = (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const email = req.body.email;
    const name = req.body.name;
    
    var id = foo();

    console.log(id, login, password, email, name);
    pool.query(
      "INSERT INTO users (id, login, password, email, name) VALUES ($1, $2, $3, $4, $5)",
      [id, login, password, email, name],
      (err, results) => {
        console.log(err);
        res.send(results);
      }
    );
  }

export const login= (req, res) => {
  console.log(req.body);
  const login = req.body.login;
  const password = req.body.password;
  
  // pool.query(
  //   "SELECT * FROM users WHERE login = $1",
  //   [login],
  //   (err, results) => {
  //       console.log('res:', results.rows[0]);
  //     if (results){
  //       console.log('res:', results);
  //     }
      
  //     if (err) {
  //       console.log(err);
  //     }
  //     if (results) {
  //       if (password == results.rows[0].password) {
  //         res.json({ loggedIn: true, login: login
  //         });
  //       } else {
  //         res.json({
  //           loggedIn: false,
  //           message: "Неправильный логин или пароль.",
  //         });
  //       }
  //     } else {
  //       res.json({ loggedIn: false, message: "Пользователь не существует." });
  //     }
  //     console.log("loggedIn: ", loggedIn);
  //   }
  // );

  const q = "SELECT * FROM users WHERE login = $1";

  pool.query(q, [req.body.login], (err, data) => {
    console.log(data.rows[0].password);
    console.log(req.body.password);
    console.log(data.rowCount);
    console.log(err);
    if (err) return res.status(500).json(err);
    if (data.rowCount === 0) return res.status(404).json("User not found!");

    // const checkPassword = bcrypt.compareSync(
    //   req.body.password,
    //   data.rows[0].password
    // );
    // console.log(checkPassword);
    if (req.body.password != data.rows[0].password)
      return res.status(400).json("Wrong password or login!");

    const token = jwt.sign({ id: data.rows[0].id }, "secretkey");

    const { password, ...others } = data.rows[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};