import {pool } from "../pool.js";
import jwt from "jsonwebtoken";

export const getGroupRelationships = (req,res)=>{
    const q = `SELECT g.* FROM groups AS g LEFT JOIN group_relationships AS g_r ON (g.id = g_r.group_id) 
    ORDER BY CASE 
    WHEN g_r.follower_id = $1 THEN 1
    ELSE 0
    END DESC`;

   pool.query(q, [req.query.follower], (err, data) => {
    console.log("group rel err: ", err);
    console.log("group rel data: ", data);
      // if (err) return res.status(500).json(err);
      // return res.status(200).json(data.rows);
      if (err) return res.status(500).json(err);
      const { ...info } = data.rows;
      return res.json(info);
    });
}
export const getGroupFollowers = (req,res)=>{
    const q = "SELECT follower_id FROM group_relationships WHERE group_id = $1";

    pool.query(q, [req.query.groupId], (err, data) => {
     console.log("group rel err: ", err);
     console.log("group rel data: ", data.rows);
       // if (err) return res.status(500).json(err);
       // return res.status(200).json(data.rows);
       if (err) return res.status(500).json(err);
       return res.status(200).json(data.rows.map(relationship=>relationship.follower_id));
     });
}

export const getGroupNotFollowers = (req,res)=>{
  const q = "SELECT * FROM users AS u JOIN relationships AS r ON (u.id != r.followedUserId) WHERE r.followerUserId = $1 ORDER BY u.name";

   pool.query(q, [req.query.followerUserId], (err, data) => {
    console.log("rel err: ", err);
    console.log("rel data: ", data);
      // if (err) return res.status(500).json(err);
      // return res.status(200).json(data.rows);
      if (err) return res.status(500).json(err);
      const {followeruserid, followeduserid, ...info } = data.rows;
      return res.json(info);
    });
}

export const addGroupRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO group_relationships (follower_id,group_id) VALUES ($1, $2)";
    const values = [
      userInfo.id,
      req.body.groupId
    ];

   pool.query(q, values, (err, data) => {
    console.log("group add rel err: ", err);
    console.log("group add rel data: ", data);
      if (err) return res.status(500).json(err);
      return res.status(200).json("Following");
    });
  });
};

export const deleteGroupRelationship = (req, res) => {

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM group_relationships WHERE follower_id= $1 AND group_id = $2";

   pool.query(q, [userInfo.id, req.query.groupId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Unfollow");
    });
  });
};