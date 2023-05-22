import "./friendCard.css";
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import ImageIcon from '@mui/icons-material/Image';
import PlaceIcon from "@mui/icons-material/Place";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { makeRequest } from "../../axios";
import React  from 'react';
import { Link, useLocation } from "react-router-dom";

const FriendCard = ({user}) => {
  const userId = user.id;
  const { currentUser } = useContext(AuthContext);
  console.log("user: ", user)
  console.log("curr usr id; ", currentUser.id)
  // const { isLoading: rIsLoading, data: relationshipData } = useQuery(
  //   ["relationship"],
  //   () =>
  //     makeRequest.get("/relationships?followedUserId=" + currentUser.id).then((res) => {
  //       return res.data;
  //     })
  // );

  const { isLoading: fIsLoading, data: fData } = useQuery(
    ["relationship", userId],
    () =>
      makeRequest.get("/relationships/followers?followedUserId=" + userId).then((res) => {
      return res.data;
      })
  );
  const queryClient = useQueryClient();
  console.log("fData: ", fData);

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
    mutation.mutate(fData.includes(currentUser.id));
  };
  
  return (
    <div className="friend">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={"/upload/" + user.profilepic} alt="" />
            <div className="info">
              <div className="name">
                <Link
                    to={`/profile/${user.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                  {/* {console.log("user: ", user)} */}
                  <span className="name">{user.name}</span>
                </Link>
              </div>
              <div className="item">
                <PlaceIcon />
                <span>{user.country_name}, {user.city_name}</span>
              </div>
            </div>
          </div>
           <div className="right">
            {fIsLoading ? (
              ""
            ) : (
            fData.includes(currentUser.id) ? (
                <button className="followed" onClick={handleFollow}>У вас в друзьях</button>
              ) : (
                <button onClick={handleFollow}>Добавить в друзья</button>)
            )
            }
            
          </div>
        </div>
        {/* <hr />
        <div className="bottom">
         
        </div> */}
      </div>
    </div>
  );
};

export default FriendCard;