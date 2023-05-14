import { pool } from "../pool.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
  let q = "";
  if (req.query.isGroup === "true")
    q = "SELECT g_c.*,  name, profilepic FROM group_comments AS g_c JOIN users AS u ON (u.id = g_c.user_id) WHERE g_c.group_post_id = $1 ORDER BY G_c.createdat DESC";
    // q = "SELECT g_c.* FROM group_comments AS g_c WHERE g_c.group_post_id = $1 ";
  else
    q = `SELECT c.*, u.id AS userId, name, profilepic FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE c.postId = $1 ORDER BY c.createdat DESC`;

  pool.query(q, [req.query.postId], (err, data) => {
    console.log("q: ", q);
    console.log("comm err: ", err);
    console.log("isGroup: ", req.query.isGroup);
    console.log("postid: ", req.query.postId);
    console.log("comm data: ", data.rows);
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    let q = "";
    if (req.query.isGroup === "true")
      q = "INSERT INTO group_comments(description, createdat, user_id, group_post_id) VALUES ($1, $2, $3, $4)";
    else
      q = "INSERT INTO comments(description, createdAt, userId, postId) VALUES ($1, $2, $3, $4)";
    const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId
    ];

    pool.query(q, values, (err, data) => {
        // console.log("comm err: ", err);
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been created.");
    });
  });
};

export const deleteComment = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const commentId = req.params.id;
    // let q = "";
    const q = "DELETE FROM comments WHERE id = $1 AND userid = $2";

    pool.query(q, [commentId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Comment has been deleted!");
      return res.status(403).json("You can delete only your comment!");
    });
  });
};
