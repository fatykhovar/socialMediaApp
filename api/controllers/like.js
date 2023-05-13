import {pool } from "../pool.js";
import jwt from "jsonwebtoken";

export const getLikes = (req,res)=>{
  let q = "";
  if (req.query.isGroup)
    q = "SELECT user_id FROM group_likes WHERE group_post_id = $1";
  else
    q = "SELECT userid FROM likes WHERE postid = $1";
    // console.log("like groupId: ", req.query.postId);
    pool.query(q, [req.query.postId], (err, data) => {
        // console.log("getGroupLike err: ", err);
        // console.log("getGroupLike edata: ", data.rows);

      if (err) return res.status(500).json(err);
      if (req.query.isGroup)
        return res.status(200).json(data.rows.map(like=>like.user_id));
      else
        return res.status(200).json(data.rows.map(like=>like.userid));
    });
}

export const addLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    console.log("addLike err: ", err);
    if (err) return res.status(403).json("Token is not valid!");
    let q = "";

    if (req.query.isGroup)
      q = "INSERT INTO group_likes (user_id, group_post_id) VALUES ($1, $2)";
    else
      q = "INSERT INTO likes (userId, postId) VALUES ($1, $2)";
    const values = [
      userInfo.id,
      req.body.postId
    ];

    pool.query(q, values, (err, data) => {
      // console.log("addGroupLike err: ", err);
      // console.log("addGroupLike edata: ", data.rows);
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
    let q;
    if (req.query.isGroup)
      q = "DELETE FROM group_likes WHERE user_id = $1 AND group_post_id = $2";
    else
      q = "DELETE FROM likes WHERE userId = $1 AND postId = $2";

    pool.query(q, [userInfo.id, req.query.postId], (err, data) => {
      // console.log("delLike err: ", err);
      //   console.log("delLike edata: ", data.rows);
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been disliked.");
    });
  });
};