import {pool } from "../pool.js";
import jwt from "jsonwebtoken";

export const getRelationships = (req,res)=>{
    const q = "SELECT followerUserId FROM relationships WHERE followedUserId = $1";

   pool.query(q, [req.query.followedUserId], (err, data) => {
    // console.log("rel err: ", err);
    // console.log("rel data: ", data);
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.rows.map(relationship=>relationship.followeruserid));
    });
}
export const getFollowers = (req,res)=>{
  const q = "SELECT * FROM relationships AS r JOIN users AS u ON (u.id = r.followedUserId) WHERE r.followerUserId = $1";

 pool.query(q, [req.query.followerUserId], (err, data) => {
  // console.log("followers err: ", err);
  // console.log("followers data: ", data);
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.rows);
  });
}

export const addRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO relationships (followerUserId,followedUserId) VALUES ($1, $2)";
    const values = [
      userInfo.id,
      req.body.userId
    ];

   pool.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Following");
    });
  });
};

export const deleteRelationship = (req, res) => {

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM relationships WHERE followerUserId = $1 AND followedUserId = $2";

   pool.query(q, [userInfo.id, req.query.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Unfollow");
    });
  });
};