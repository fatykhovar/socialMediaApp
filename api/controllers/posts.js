import { pool } from "../pool.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const userId = req.query.userId;
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
      userId !== "undefined"
        ? "SELECT p.*, u.id AS userid, name, profilepic FROM posts AS p JOIN users AS u ON (u.id = p.userid) WHERE p.userId = $1 ORDER BY p.createdAt DESC"
        :"SELECT p.*, u.id AS userid, name, profilepic FROM posts AS p JOIN users AS u ON (u.id = p.userid) ORDER BY p.createdAt DESC"
    const q1 = "SELECT * FROM posts"
    const values =
      userId !== "undefined" ? [userId] : [];

    pool.query(q, values, (err, data) => {
      // console.log("getPosts data: ", data);
      // console.log("posts err: ", err);
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
    // console.log("addPost req: ", req.body);
    const q =
      "INSERT INTO posts (description, image, createdat, userId, file) VALUES ($1, $2, $3, $4, $5)";
    pool.query(
      q, 
      [
        // 1,
        req.body.desc,
        req.body.img,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id,
        req.body.file
      ], 
      (err, data) => {
      console.log("addpost data: ", data);
      console.log("addpost err: ", err);

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

    const q = "DELETE FROM posts WHERE id=$1 AND userid = $2";

    pool.query(q, [req.params.id, userInfo.id], (err, data) => {
      console.log("delpost err: ", err);
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post");
    });
  });
};