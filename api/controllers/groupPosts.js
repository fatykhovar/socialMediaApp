import { pool } from "../pool.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const groupId = req.query.groupId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  // console.log("getPosts req: ", req);

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    //console.log(userId);

    // const q =
    //   userId !== "undefined"
    //     ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
    //     : `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
    // LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =?
    // ORDER BY p.createdAt DESC`;

    const q = 
    groupId !== "undefined"
        ? "SELECT g_p.*, g.id AS group_id, groupname, groupprofilepic FROM group_posts AS g_p JOIN groups AS g ON (g.id = g_p.group_id) WHERE g_p.group_id = $1 ORDER BY g_p.created_at DESC"
        :"SELECT g_p.*, g.id AS group_id, groupname, groupprofilepic FROM group_posts AS g_p JOIN groups AS g ON (g.id = g_p.group_id) ORDER BY g_p.created_at DESC"
    const q1 = "SELECT * FROM posts"
    const values =
    groupId !== "undefined" ? [groupId] : [];

    pool.query(q, values, (err, data) => {
      console.log("getPosts data: ", data);
      console.log("posts err: ", err);
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    console.log("addGroupPost req: ", req.body);
    const q =
      "INSERT INTO group_posts (description, image, created_at, group_id) VALUES ($1, $2, $3, $4)";
    pool.query(
      q, 
      [
        // 1,
        req.body.desc,
        req.body.img,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        req.body.groupId
      ], 
      (err, data) => {
      console.log("addGroupPost data: ", data);
      console.log("addGroupPost err: ", err);

      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM group_posts WHERE id=$1 AND group_id = $2";

    pool.query(q, [req.params.id, userInfo.id], (err, data) => {
      console.log("delpost err: ", err);
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post");
    });
  });
};