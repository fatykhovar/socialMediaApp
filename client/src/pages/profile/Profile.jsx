import "./profile.css";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import Posts from "../../components/posts/Posts";
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
  const { currentUser } = useContext(AuthContext);

  // const userId = parseInt(useLocation().pathname.split("/")[2]);
  const userId = currentUser.id;

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/user/find/" + userId).then((res) => {
      
      return res.data;
    })
  );
  console.log("data: ", data)
//   const { isLoading: rIsLoading, data: relationshipData } = useQuery(
//     ["relationship"],
//     () =>
//       makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
//         return res.data;
//       })
//   );

  const queryClient = useQueryClient();

//   const mutation = useMutation(
//     (following) => {
//       if (following)
//         return makeRequest.delete("/relationships?userId=" + userId);
//       return makeRequest.post("/relationships", { userId });
//     },
//     {
//       onSuccess: () => {
//         // Invalidate and refetch
//         queryClient.invalidateQueries(["relationship"]);
//       },
//     }
//   );

//   const handleFollow = () => {
//     mutation.mutate(relationshipData.includes(currentUser.id));
//   };

  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <img
             src={"/upload/16817442441814fbe8e818c449587d591359ac892cba2.jpg"}
              alt="" className="cover" />
            <img
             src={"/upload/" + data.profilePic}
              alt="" className="profilePic" />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <h3>Left</h3>
              </div>
              <div className="center">
                <span>{data.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    {/* <span>{data.city}</span> */}
                  </div>
                  {/* <div className="item">
                    <LanguageIcon />
                    <span>{data.website}</span>
                  </div> */}
                </div>
                
                  <button onClick={() => setOpenUpdate(true)}>Редактировать</button>
                
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            {/* <Posts userId={userId} /> */}
          </div>
        </>
      )} 
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;