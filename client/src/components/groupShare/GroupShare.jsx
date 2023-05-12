import "./groupShare.css";
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import ImageIcon from '@mui/icons-material/Image';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient, useQuery} from "react-query";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import React  from 'react';

const GroupShare = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const queryClient = useQueryClient();

  const groupId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["groupsFind"], () =>
  makeRequest.get("/groups/find/" + groupId).then((res) => {
    return res.data;
  })
);

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/groupPosts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["groupPosts"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl, groupId });
    setDesc("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={"/upload/" + data.groupprofilepic} alt="" />
            <input
              type="text"
              placeholder={`Что нового?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <ImageIcon/>
                <span>Фотография</span>
              </div>
            </label>
            <div className="item">
              <AddLocationAltIcon/>
              <span>Место</span>
            </div>
            <div className="item">
              <PersonPinCircleIcon />
              <span>Друзья</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Поделиться</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupShare;