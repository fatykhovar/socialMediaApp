import "./friendCard.css";
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import ImageIcon from '@mui/icons-material/Image';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { makeRequest } from "../../axios";
import React  from 'react';
import { Link, useLocation } from "react-router-dom";

const FriendCard = ({user}) => {
  const userId = user.id;
  const { currentUser } = useContext(AuthContext);

  console.log("curr usr id; ", currentUser.id)
  // const { isLoading: rIsLoading, data: relationshipData } = useQuery(
  //   ["relationship"],
  //   () =>
  //     makeRequest.get("/relationships?followedUserId=" + currentUser.id).then((res) => {
  //       return res.data;
  //     })
  // );

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship", userId],
    () =>
      makeRequest.get("/relationships/followers?followedUserId=" + userId).then((res) => {
      //   let result = Object.values(res.data);
      // const filteredData = result.filter(user => {
      //     return user.followeruserid;
      //   })
      // console.log("filtredData: ", filteredData)
      // return filteredData;
      return res.data;
      })
  );
  const queryClient = useQueryClient();
  console.log("reData: ", relationshipData);

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );
  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };
  
  return (
    <div className="friend">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={"/upload/" + user.profilepic} alt="" />
            <Link
                to={`/profile/${user.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
              {/* {console.log("user: ", user)} */}
              <span className="name">{user.name}</span>
            </Link>
          </div>
           <div className="right">
            {rIsLoading ? (
              ""
            ) : (
              <button
             onClick={handleFollow}
             >
              {relationshipData.includes(currentUser.id)
                      ? "У вас в друзьях"
                      : "Добавить в друзья "}
              </button>
            )
            }
            
          </div>
        </div>
        <hr />
        <div className="bottom">
         
        </div>
      </div>
    </div>
  );
};

export default FriendCard;