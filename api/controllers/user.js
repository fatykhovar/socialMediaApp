
import { pool } from "../pool.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT u.*, c.name AS country_name FROM users AS u JOIN country AS c ON (c.id = u.country_id AND u.country_id IS NOT NULL) WHERE u.id= $1 ";
  // const q = "SELECT *  FROM users AS u JOIN country AS c ON (c.id = u.country_id) WHERE u.id= $1";

  // console.log("userId: ", userId);
  pool.query(q, [userId], (err, data) => {
    console.log("getUser err: ", err);
    console.log("getUser data: ", data.rows[0]);
    if (err) return res.status(500).json(err);
    const {...info } = data.rows[0];
    
    return res.json(info);
  });
};

export const getUsers = (req, res) => {
  // const key = req.params.key;
  // console.log("key: ", key);
  // const q = "SELECT * FROM users WHERE name LIKE $1"
  const q = "SELECT * FROM users"
  
  pool.query(q, (err, data) => {
    // console.log("getUsers data: ", data.rows);
    // console.log("getUsers err: ",err);
    if (err) return res.status(500).json(err);
    const { password, ...info } = data.rows;
    return res.json(info);
  });
};

export const searchUsers = (req, res) => {
  const key ='%'+ req.query.key+'%';
  // const key =req.params.key;
  console.log("usersKey: ", key);
  const q = `SELECT u.* FROM users AS u LEFT JOIN relationships AS r ON (u.id = r.followedUserId) WHERE u.name LIKE $1 
  ORDER BY CASE 
    WHEN r.followerUserId = $2 THEN 1
    ELSE 0
    END DESC`
  
  pool.query(q, [key, req.query.follower],  (err, data) => {
    console.log("searchUsers data: ", data.rows);
    console.log("searchUsers err: ",err);
    if (err) return res.status(500).json(err);
    const { ...info } = data.rows;
    return res.json(info);
  });
}


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
    "UPDATE users SET name=$1, profilePic=$2, coverPic=$3, country_id=(SELECT id FROM country WHERE name=$5) WHERE id=$4";
    pool.query(
      q,
      [
        req.body.name[0],
        // req.body.city,
        // req.body.website,
        req.body.profilePic,
        req.body.coverPic,
        userInfo.id,
        req.body.country
      ],
      (err, data) => {
        // console.log("update data: ", data);
        console.log("update err: ",err);
        if (err) res.status(500).json(err);
        if (data) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    );
  });
};