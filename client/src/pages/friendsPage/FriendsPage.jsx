import { useState } from "react";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";
import "./friendsPage.css";
import SearchOutlinedIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useMutation, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React  from 'react'; 
import FriendCard from "../../components/friendCard/FriendCard";

const FriendsPage = ()=>{
  const [key, setKey] = useState("");

  console.log("s err: ", key)

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/user").then((res) => {
        console.log("key req data: ", res.data)
        let result = Object.values(res.data);
      const filteredData = result.filter(user => {
          return user.name.includes(key)
        })
      console.log("filtredData: ", filteredData)
      return filteredData;
      // return Object.values(res.data);
    })
  );
  console.log("s data: ", data);
  
	const queryClient = useQueryClient();
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  
  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationshipFollowers"],
    () =>
      makeRequest.get("/relationships/followers?followerUserId=" + userId).then((res) => {
        return res.data;
      })
  );

  console.log("friends relData: ", relationshipData)
  return(
    <div className="friendsPage">
        <div className="navbar">
          <h1>Друзья</h1>
          <div className="search">
              <SearchOutlinedIcon />
              <input type="text" placeholder="Поиск..."
              onChange={(e) => setKey(e.target.value)}
              />
          </div>
          {/* <div className="item">
              <AddIcon onClick={() => setCreateGroup(true)}/>
            <span>Создать сообщество</span>
          </div> */}
        </div>
        <div className="scroller">
            {error
                ? "Something went wrong!"
                : isLoading
                ? "loading"
                :data.map((user) => <FriendCard  user={user}/>)}
        </div>
    </div>
  );
};

export default FriendsPage;