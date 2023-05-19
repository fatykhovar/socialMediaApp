import { useContext, useState , useEffect } from "react";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";
import "./friendsPage.css";
import SearchOutlinedIcon from '@mui/icons-material/Search';
import { useMutation, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

import React  from 'react'; 
import FriendCard from "../../components/friendCard/FriendCard";

const FriendsPage = ()=>{
  const [key, setKey] = useState("");
  const [results, setResults] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/user").then((res) => {
      return Object.values(res.data);
    })
  );

  console.log("Data: ", data);


  const { isLoading: rIsLoading, error: rError, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followerUserId=" + currentUser.id).then((res) => {
      return Object.values(res.data);
      })
  );

  console.log("reData: ", relationshipData);

  const { isLoading: notFolIsLoading, error: notFolError,  data: notFolData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships/notFollowers?followerUserId=" + currentUser.id).then((res) => {
        return res.data;
      })
  );

  useEffect(() => {
    if (key !== "") {
      makeRequest.get(`/user/search?key=${key}&follower=${currentUser.id}`).then((res) => {
        // console.log("searchUsers: ", res.data);
        setResults(Object.values(res.data));
      });
    } else {
      setResults([]);
    }
  }, [key]);
  

	const queryClient = useQueryClient();
  const userId = parseInt(useLocation().pathname.split("/")[2]);



  return(
    <div className="friendsPage col-12 col-md-8">
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
        <div className="scroll">
          {
            key !== "" ? (
              results.map((user) => <FriendCard  user={user}/>)
            ) : (
              // error
              //   ? "Something went wrong!"
              //   : isLoading
              //   ? "loading"
              //   : data.map((user) => <FriendCard  user={user}/>),
              "loading",
                rError ? "Something went wrong!"
                : rIsLoading
                ? "loading" 
                : relationshipData.map((user) => <FriendCard  user={user}/>)
                
            )
          }
            
        </div>
    </div>
  );
};

export default FriendsPage;