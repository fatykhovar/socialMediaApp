import "./group.css";
import Share from "../../components/share/Share";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import { useState } from "react";
import React  from 'react';
import { Link } from "react-router-dom";

const Group = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openFriends, setOpenFriends] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const groupId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["groupsFind"], () =>
    makeRequest.get("/groups/find/" + groupId).then((res) => {
      return res.data;
    })
  );
  console.log("Group data: ",data)
  console.log("Group error: ",error)

  // const { isLoading: rIsLoading, data: relationshipData } = useQuery(
  //   ["relationship"],
  //   () =>
  //     makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
  //       return res.data;
  //     })
  // );
  // console.log("relData: ", relationshipData)
  // const queryClient = useQueryClient();

  // const mutation = useMutation(
  //   (following) => {
  //     if (following)
  //       return makeRequest.delete("/relationships?userId=" + userId);
  //     return makeRequest.post("/relationships", { userId });
  //   },
  //   {
  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries(["relationship"]);
  //     },
  //   }
  // );

  // const handleFollow = () => {
  //   mutation.mutate(relationshipData.includes(currentUser.id));
  // };

  return (
    <div className="group">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <img
             src={"/upload/" + data.groupcoverpic}
              alt="" className="cover" />
            <div className="desc">
                
                <div className="groupContainer">
                    <div className="uInfo">
                    {/* <div className="top">
                        <div className="item">
                        </div>
                    </div> */}
                    <div className="center">
                        <span>{data.groupname}</span>
                        <div className="info">
                          <div className="item">
                            <span>Описание: {data.description}</span>
                          </div>
                          <div className="item">
                            <span>Создатель: </span>
                            <img src={"/upload/"+data.profilepic} alt="" />
                            <Link
                              to={`/profile/${data.userid}`}
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <span className="name">{data.name}</span>
                            </Link>
                          </div>
                          
                        </div>
                    {/* <div className="right">
                        
                    </div> */}
                    </div>
                    </div>
                </div>
                    <img
                     src={"/upload/" + data.groupprofilepic}
                    alt="" className="groupPic" />
            </div>
        </div>

        </>
      )}
    </div>
      
  );
};

export default Group;