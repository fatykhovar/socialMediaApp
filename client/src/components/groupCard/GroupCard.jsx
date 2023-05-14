import "./groupCard.css";
import React  from 'react';
import { useContext, useState , useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";

const GroupCard = ({group}) => {
  const groupId = group.id;
  const { currentUser } = useContext(AuthContext);

  const { isLoading: fIsLoading, data: fData } = useQuery(
    ["relationship", groupId],
    () =>
      makeRequest.get("/groupRelationships/followers?groupId=" + groupId).then((res) => {
      return res.data;
      })
  );
  console.log("fData: ", fData);

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/groupRelationships?groupId=" + groupId);
      return makeRequest.post("/groupRelationships", { groupId });
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
    <div className="groupCard">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={"/upload/" + group.groupprofilepic} alt="" />
            <Link
                to={`/group/${group.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
              <span className="name">{group.groupname}</span>
            </Link>
          </div>
          <div className="right">
            {fIsLoading ? (
              ""
            ) : (
              fData.includes(currentUser.id) ? (
                <button className="followed" onClick={handleFollow}>Вы подписаны</button>
              ) : (
                <button onClick={handleFollow}>Подписаться</button>)
            )
            }
            
          </div>
           {/* <div className="right">
            <button
            //  onClick={handleClick}
             >Подписаться</button>
          </div> */}
        </div>
        <hr />
        <div className="bottom">
         
        </div>
      </div>
    </div>
  );
};

export default GroupCard;