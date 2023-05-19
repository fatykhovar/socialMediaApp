import "./profile.css";
import PlaceIcon from "@mui/icons-material/Place";
import GroupIcon from '@mui/icons-material/Group';
import Posts from "../../components/posts/Posts";
import Friends from "../../components/friends/Friends";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import { useState } from "react";
import React  from 'react';


const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openFriends, setOpenFriends] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["userFind"], () =>
    makeRequest.get("/user/find/" + userId).then((res) => {
      return res.data;
    })
  );
  console.log("profile data: ",data)

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships/followers?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  );

  const { isLoading: fIsLoading, data: fData } = useQuery(
    ["relationship", userId],
    () =>
      makeRequest.get("/relationships/followers?followedUserId=" + userId).then((res) => {
      return res.data;
      })
  );
  console.log("relData: ", relationshipData)
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <img
             src={"/upload/" + data.coverpic}
              alt="" className="cover" />
            <img
             src={"/upload/" + data.profilepic}
              alt="" className="profilePic" />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              {/* <div className="left">
                
              </div> */}
              <div className="center">
                <span>{data.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{data.country_name}</span>
                  </div>
              
                </div>
                
                {rIsLoading ? (
                "loading"
                  ) : userId === currentUser.id ? (
                    <button onClick={() => setOpenUpdate(true)}>Редактировать</button>
                  ) : (
                      relationshipData.includes(currentUser.id) ? (
                        <button className="followed" onClick={handleFollow}>У вас в друзьях</button>
                          ) : (
                        <button onClick={handleFollow}>Добавить в друзья</button>)
                  )
                }
                 <div className="right">
                {/* <GroupIcon onClick={() => setOpenFriends(true)}/> */}
              </div>
              </div>
             
            </div>
          </div>
          <Posts userId={userId} />
        </>
      )} 
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
			{openFriends && <Friends setOpenFriends={setOpenFriends} user={data} />}
    </div>
  );
};

export default Profile;