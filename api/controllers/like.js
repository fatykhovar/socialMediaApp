import {pool } from "../pool.js";
import jwt from "jsonwebtoken";

export const getLikes = (req,res)=>{
    const q = "SELECT userid FROM likes WHERE postid = $1";

    pool.query(q, [req.query.postId], (err, data) => {
        // console.log("getLike err: ", err);
        // console.log("getLike edata: ", data.rows);

      if (err) return res.status(500).json(err);
      return res.status(200).json(data.rows.map(like=>like.userid));
    });
}

export const addLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    console.log("addLike err: ", err);
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO likes (userId, postId) VALUES ($1, $2)";
    const values = [
      userInfo.id,
      req.body.postId
    ];

    pool.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been liked.");
    });
  });
};

export const deleteLike = (req, res) => {

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM likes WHERE userId = $1 AND postId = $2";

    pool.query(q, [userInfo.id, req.query.postId], (err, data) => {
      // console.log("delLike err: ", err);
      //   console.log("delLike edata: ", data.rows);
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been disliked.");
    });
  });
};