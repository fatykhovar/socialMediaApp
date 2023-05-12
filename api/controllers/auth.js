import {pool} from "../pool.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passwordValidator from 'password-validator'

const saltRounds = 10;

function isEmail(email) {
  var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (email !== '' && email.match(emailFormat)) { return true; }
  
  return false;
}

var schema = new passwordValidator();

// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
// .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


export const register = (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const email = req.body.email;
    const name = req.body.name;
    var errors = []; 
  
    console.log("password val: ", schema.validate(password));
    if (!isEmail(email))
      errors.push("Invalid email!");
    //  return  res.status(400).json("Invalid email!");
    if (!schema.validate(password)) 
      errors.push("Invalid password!");
    if (!login || !password || !email || !name)
      errors.push("Empty inputs!");
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
          pool.query(
          "INSERT INTO users (login, password, email, name) VALUES ($1, $2, $3, $4)",
          [login, hash, email, name],
          (err, results) => {
            if (err && err.code === "23505") errors.push("Duplicate!")
            console.log(err);
            console.log("errors reg: ", errors);
            if (errors.length !== 0) return res.status(400).json(errors);
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
  var error;

  const q = "SELECT * FROM users WHERE login = $1";

  if (!login || !password) return res.status(400).json("Invalid login or password!");
  pool.query(q, [login], (err, data) => {
    console.log(data.rows[0].password);
    console.log(req.body.password);
    console.log(data.rowCount);
    console.log(err);
    if (err) return res.status(500).json(err);
    if (data.rowCount === 0) return res.status(404).json("Invalid login or password!");
    bcrypt.compare(password, data.rows[0].password).then(function(result) {
      if (!result)
        return res.status(400).json("Invalid login or password!");
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