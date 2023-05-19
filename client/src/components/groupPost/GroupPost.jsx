import "./groupPost.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import moment from "moment";
import 'moment/locale/ru'; 
import { useQuery, useQueryClient, useMutation } from "react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import React  from 'react';

const GroupPost = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext);
  console.log("post: ", post);
  const postId = post.id;
  console.log("groupLike postId:" , postId);

  const { isLoading: cIsLoading, error: cError, data: sData } = useQuery(["comments",{postId} ], () =>
  makeRequest.get(`/comments?postId=${postId}&isGroup=true`).then((res) => {
    return res.data.rows;
  })
  );
  const { isLoading, error, data } = useQuery(["likes", postId], () =>
    makeRequest.get(`/likes?postId=${postId}&isGroup=true`).then((res) => {
      return res.data;
    })
  );

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete(`/likes?postId=${postId}&isGroup=true`);
      return makeRequest.post(`/likes?isGroup=true`, { postId: postId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );
  console.log("groupLike data:" , data);
  // const deleteMutation = useMutation(
  //   (postId) => {
  //     return makeRequest.delete("/posts/" + postId);
  //   },
  //   {
  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries(["posts"]);
  //     },
  //   }
  // );

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  // const handleDelete = () => {
  //   deleteMutation.mutate(post.id);
  // };

  return (
    <div className="groupPost  col-12 col-md-8">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={"/upload/"+post.groupprofilepic} alt="" />
            <div className="details">
              <Link
                to={`/group/${post.group_id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.groupname}</span>
              </Link>
              <span className="date">{moment(post.created_at).fromNow()}</span>
            </div>
          </div>
          {/* <div className="item">
            <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
            {menuOpen && post.group_id === currentUser.id 
            && (
              <button onClick={handleDelete}>Удалить</button>
            )
            }
          </div> */}
        </div>
        <div className="content">
          <p>{post.description}</p>
          <img src={"/upload/" + post.image} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "loading"
            ) : data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
             ) : ( 
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data ? Object.keys(data).length : <span></span>}
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            Комментарии
            {sData ? <span>({Object.keys(sData).length})</span>  : <span></span>}
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Поделиться
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} isGroup={true} />}
      </div>
    </div>
  );
};

export default GroupPost;