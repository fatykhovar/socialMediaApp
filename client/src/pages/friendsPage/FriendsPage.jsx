import { useState } from "react";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";
import "./FriendsPage.css";
import SearchOutlinedIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useMutation, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React  from 'react'; 
import CreateGroup from "../../components/createGroup/CreateGroup";
import GroupCard from "../../components/groupCard/GroupCard";

const FriendsPage = ()=>{
  const [key, setKey] = useState("");
  const [createGroup, setCreateGroup] = useState(false);

  // console.log("s err: ", key)

  const { isLoading, error, data } = useQuery(["Friends"], () =>
    makeRequest.get("/friends").then((res) => {
        console.log("key req data: ", res.data)
      //   let result = Object.values(res.data);
      // const filteredData = result.filter(user => {
      //     return user.name.includes(key)
      //   })
      // return filteredData;
      console.log("Friends: ", res.data)
      return Object.values(res.data);
    })
  );
  // console.log("s data: ", data);
  
	const queryClient = useQueryClient();
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  return(
    <div className="FriendsPage">
        <div className="navbar">
          <h1>Сообщества</h1>
          <div className="search">
              <SearchOutlinedIcon />
              <input type="text" placeholder="Поиск..."
              onChange={(e) => setKey(e.target.value)}
              />
          </div>
          <div className="item">
              <AddIcon onClick={() => setCreateGroup(true)}/>
            <span>Создать сообщество</span>
          </div>
        </div>
        <div className="scroller">
            {error
                ? "Something went wrong!"
                : isLoading
                ? "loading"
                :data.map((group) => <GroupCard  group={group}/>)}
        </div>
      {createGroup && <CreateGroup setCreateGroup={setCreateGroup}/>}
    </div>
  );
};

export default FriendsPage;