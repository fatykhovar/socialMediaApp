import { useState } from "react";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";
import "./friends.css";
import Friend from "../friend/Friend";
import SearchOutlinedIcon from '@mui/icons-material/Search';
import { useMutation, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import React  from 'react'; 

const Friends = ({ setOpenFriends, user }) => {
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


  return (
    <div className="friends">
      <div className="wrapper">
        <h1>Друзья</h1>
        <div className="search">
            <SearchOutlinedIcon />
            <input type="text" placeholder="Поиск..."
             onChange={(e) => setKey(e.target.value)}
            //  onChange={handleSearch}
             
             />
        </div>
        <div className="scroller">
            {error
                ? "Something went wrong!"
                : rIsLoading
                ? "loading"
                :relationshipData.map((user) => <Friend user={user} key={user.id} />)}
        </div>
        <button className="close" onClick={() => setOpenFriends(false)}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default Friends;