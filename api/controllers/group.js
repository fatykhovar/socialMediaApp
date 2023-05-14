import { pool } from "../pool.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getGroups = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM groups ORDER BY groupname";
  // console.log("userId: ", userId);
  pool.query(q, (err, data) => {
    console.log("getGroups: ", data.rows);
    if (err) return res.status(500).json(err);
    const { password, ...info } = data.rows;
    
    return res.json(info);
  });
};

export const findGroup = (req, res) => {
  const groupId = req.params.groupId;
  const q = "SELECT * FROM groups AS g JOIN users AS u ON (u.id = g.userid) WHERE g.id= $1";
  console.log("groupId: ", groupId);
  pool.query(q, [groupId], (err, data) => {
    console.log(data.rows[0]);
    if (err) return res.status(500).json(err);
    const { password, ...info } = data.rows[0];
    
    return res.json(info);
  });
};

export const searchGroups = (req, res) => {
  const key ='%'+ req.query.key+'%';
  // const key =req.params.key;
  console.log("groupsKey: ", key);
  const q = `SELECT g.* FROM groups AS g LEFT JOIN group_relationships AS g_r ON (g.id = g_r.group_id) WHERE g.groupname LIKE $1 
  ORDER BY CASE 
    WHEN g_r.follower_id = $2 THEN 1
    ELSE 0
    END DESC`
  // const q = "SELECT * FROM groups WHERE groupname LIKE $1"
  pool.query(q, [key, req.query.follower],  (err, data) => {
    console.log("searchGroups data: ", data.rows);
    console.log("searchGroups err: ",err);
    if (err) return res.status(500).json(err);
    const { ...info } = data.rows;
    return res.json(info);
  });
}

export const addGroup = (req, res) => {
  const token = req.cookies.accessToken;
  console.log("addGroup req: ", req)
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    // console.log("addPost req: ", req.body);
    const q =
      "INSERT INTO groups (groupname, description, groupprofilepic, groupcoverpic, createdat, userId) VALUES ($1, $2, $3, $4, $5, $6)";
    pool.query(
      q, 
      [
        req.body.name[0],
        req.body.description[0],
        req.body.profilePic,
        req.body.coverPic,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id
      ], 
      (err, data) => {
      console.log("addgroup data: ", data);
      console.log("addgroup err: ", err);

      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
  });
};