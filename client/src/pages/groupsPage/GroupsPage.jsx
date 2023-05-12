import { useState, useEffect } from "react";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";
import "./groupsPage.css";
import SearchOutlinedIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useMutation, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React  from 'react'; 
import CreateGroup from "../../components/createGroup/CreateGroup";
import GroupCard from "../../components/groupCard/GroupCard";

const GroupsPage = ()=>{
  const [key, setKey] = useState("");
  const [createGroup, setCreateGroup] = useState(false);
  const [results, setResults] = useState([]);

  const { isLoading, error, data } = useQuery(["groups"], () =>
    makeRequest.get("/groups").then((res) => {
      console.log("groups: ", Object.values(res.data))
      return Object.values(res.data);
    })
  );
  
  useEffect(() => {
    if (key !== "") {
      makeRequest.get("/groups/search/" + key).then((res) => {
        console.log("searchGroups: ", res.data);
        setResults(Object.values(res.data));
      });
    } else {
      setResults([]);
    }
  }, [key]);
  // const { isLoading: sIsLoading, error: sError,  data: sData } = useQuery(["searchGroups"], () =>
  //     makeRequest.get("/groups/search/" + key).then((res) => {
  //       console.log("searchGroups: ", Object.values(res.data))
  //       return Object.values(res.data);
  //     })
  // );

  // console.log("sdata: ", sData);

  console.log("groupsKey: ", key)
  const mutation = useMutation(
    (key) => {
      console.log("groupsKey: ", key)
      return makeRequest.get("/groups/search/" + key).then((res) => {

        console.log("searchGroups: ", res.data)
        return Object.values(res.data);
    });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["groupsSearch"]);
      },
    }
  );

  
	const queryClient = useQueryClient();
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  return(
    <div className="groupsPage">
        <div className="navbar">
          <h1>Сообщества</h1>
          <div className="search">
              <SearchOutlinedIcon />
              <input type="text" placeholder="Поиск..."
              onChange={(e) => setKey(e.target.value)}
              />
              {/* <button onClick={handleSearch(key)}>Найти</button> */}
          </div>
            <button  onClick={() => setCreateGroup(true)}>
              Создать сообщество
            </button>
        </div>
        <div className="scroller">
          {
            key !== "" ? (
              results.map((group) => <GroupCard  group={group}/>)
            ) : (
              error
                ? "Something went wrong!"
                : isLoading
                ? "loading"
                : data.map((group) => <GroupCard  group={group}/>)
            )
          }
            
        </div>
      {createGroup && <CreateGroup setCreateGroup={setCreateGroup}/>}
    </div>
  );
};

export default GroupsPage;