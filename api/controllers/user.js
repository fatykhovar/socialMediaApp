
import { pool } from "../pool.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id= $1";
  // console.log("userId: ", userId);
  pool.query(q, [userId], (err, data) => {
    // console.log(data.rows[0]);
    if (err) return res.status(500).json(err);
    const { password, ...info } = data.rows[0];
    
    return res.json(info);
  });
};

export const searchUsers = (req, res) => {
  // const key = req.params.key;
  // console.log("key: ", key);
  // const q = "SELECT * FROM users WHERE name LIKE $1"
  const q = "SELECT * FROM users"
  
  pool.query(q, (err, data) => {
    console.log("searchUsers data: ", data.rows);
    console.log("searchUsers err: ",err);
    if (err) return res.status(500).json(err);
    const { password, ...info } = data.rows;
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  // console.log(req);
  if (!token) return res.status(401).json("Not authenticated!");
  console.log("token: ", token);
  console.log("req.body: ", req.body);
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    console.log("update userInfo: ", userInfo)
    const q =
    "UPDATE users SET name=$1, city=$2, profilePic=$3, coverPic=$4 WHERE id=$5";
    pool.query(
      q,
      [
        req.body.name[0],
        req.body.city[0],
        // req.body.website,
        req.body.profilePic,
        req.body.coverPic,
        userInfo.id
      ],
      (err, data) => {
        console.log("userinfo: ", userInfo);
        console.log("err: ",err);
        if (err) res.status(500).json(err);
        if (data) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    );
  });
};