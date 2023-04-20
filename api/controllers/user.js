
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

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  // console.log(req);
  if (!token) return res.status(401).json("Not authenticated!");
  console.log("token: ", token);
  console.log("req.body: ", req.body);
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // const q =
    //   "UPDATE users SET `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id=? ";

    const q =
    "UPDATE users SET name= $1, profilePic= $2, coverPic =$3 WHERE id= $4";
    pool.query(
      q,
      [
        req.body.name[0],
        // req.body.city,
        // req.body.website,
        req.body.coverPic,
        req.body.profilePic,
        userInfo.id,
      ],
      (err, data) => {
        console.log("q data: ", data);
        if (err) res.status(500).json(err);
        if (data) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    );
  });
};