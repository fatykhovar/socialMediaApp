import {pool } from "../pool.js";
import jwt from "jsonwebtoken";

export const getRelationships = (req,res)=>{
    // const q = `SELECT u.* FROM users AS u LEFT JOIN relationships AS r ON (u.id = r.followedUserId) WHERE u.id != $1
    // ORDER BY CASE 
    // WHEN r.followerUserId = $1 THEN 1
    // ELSE 0
    // END DESC`;

    // const q = `SELECT DISTINCT u.* FROM users AS u 
    // LEFT JOIN relationships AS r ON (u.id = r.followedUserId) WHERE u.id != $1 AND r.followerUserId = $1
    // ORDER BY u.id ASC`;
      
    const q = `SELECT DISTINCT u.*, c.name AS country_name,
    r.name AS region_name, city.name AS city_name FROM users AS u 
    JOIN country AS c ON (c.id = u.country_id)
    JOIN region AS r ON (r.id = u.region_id)
    JOIN city ON (city.id = u.city_id)
    LEFT JOIN relationships AS rel ON (u.id = rel.followedUserId) WHERE u.id != $1 AND rel.followerUserId = $1
    ORDER BY u.id ASC`;
   pool.query(q, [req.query.followerUserId], (err, data) => {
    // console.log("rel err: ", err);
    // console.log("rel data: ", data);
      // if (err) return res.status(500).json(err);
      // return res.status(200).json(data.rows);
      if (err) return res.status(500).json(err);
      const {followeruserid, followeduserid, ...info } = data.rows;
      return res.json(info);
    });
}
export const getFollowers = (req,res)=>{
  const q = "SELECT followerUserId FROM relationships WHERE followedUserId = $1";

  pool.query(q, [req.query.followedUserId], (err, data) => {
  // console.log("followers err: ", err);
  // console.log("followers data: ", data.rows);
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.rows.map(relationship=>relationship.followeruserid));
  });
}

export const getNotFollowers = (req,res)=>{
  const q = "SELECT * FROM users AS u JOIN relationships AS r ON (u.id != r.followedUserId) WHERE r.followerUserId = $1 ORDER BY u.name";

   pool.query(q, [req.query.followerUserId], (err, data) => {
    // console.log("rel err: ", err);
    // console.log("rel data: ", data);
      // if (err) return res.status(500).json(err);
      // return res.status(200).json(data.rows);
      if (err) return res.status(500).json(err);
      const {followeruserid, followeduserid, ...info } = data.rows;
      return res.json(info);
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