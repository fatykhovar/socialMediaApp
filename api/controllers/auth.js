import {pool} from "../pool.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

    const saltRounds = 10;
    const myPlaintextPassword = 's0/\/\P4$$w0rD';
    const someOtherPlaintextPassword = 'not_bacon';

export const register = (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const email = req.body.email;
    const name = req.body.name;
  
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
          pool.query(
          "INSERT INTO users (login, password, email, name) VALUES ($1, $2, $3, $4)",
          [login, hash, email, name],
          (err, results) => {
            console.log(err);
            res.send(results);
          }
        );
      });
  });
    console.log(login, password, email, name);
    
  }

export const login= (req, res) => {
  console.log(req.body);
  const login = req.body.login;
  const password = req.body.password;
  

  const q = "SELECT * FROM users WHERE login = $1";

  pool.query(q, [req.body.login], (err, data) => {
    console.log(data.rows[0].password);
    console.log(req.body.password);
    console.log(data.rowCount);
    console.log(err);
    if (err) return res.status(500).json(err);
    if (data.rowCount === 0) return res.status(404).json("User not found!");

    bcrypt.compare(req.body.password, data.rows[0].password).then(function(result) {
      if (!result)
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