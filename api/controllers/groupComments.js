import { pool } from "../pool.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getGroupComments = (req, res) => {
  const q = "SELECT c.*, u.id AS userId, name, profilepic FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE c.postId = $1 ";

  pool.query(q, [req.query.postId], (err, data) => {
    console.log("comm err: ", err);
    console.log("comm data: ", data);
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addGroupComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO comments(description, createdAt, userId, postId) VALUES ($1, $2, $3, $4)";
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

export const deleteGroupComment = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const commentId = req.params.id;
    const q = "DELETE FROM comments WHERE id = $1 AND userid = $2";

    pool.query(q, [commentId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Comment has been deleted!");
      return res.status(403).json("You can delete only your comment!");
    });
  });
};
