import "./share.css";
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import ImageIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import React  from 'react';

const Share = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [desc, setDesc] = useState("");

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload/files", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (image) imgUrl = await uploadImage();
    let fileUrl = "";
    if (file) fileUrl = await uploadFile();
    mutation.mutate({ desc, img: imgUrl, file:fileUrl });
    setDesc("");
    setImage(null);
    setFile(null);
  };

  return (
    <div className="share col-md-3">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={"/upload/" + currentUser.profilepic} alt="" />
            <input
              type="text"
              placeholder={`Что нового?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {image && (
              <img className="image" alt="" src={URL.createObjectURL(image)} />
            )}
            {file && (
                <a className="file" href={URL.createObjectURL(file)} >
                  <InsertDriveFileIcon/>
                  <span>{fileName}</span>
                </a>
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <label htmlFor="image-upload">
              <div className="item">
                <ImageIcon/>
                <span>Фотография</span>
              </div>
            </label>
            <input
              type="file"
              id="image-upload"
              style={{ display: "contents" }}
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*" 
            />
            <label htmlFor="file-upload">
              <div className="item">
                <AttachFileIcon/>
                <span>Файл</span>
              </div>
            </label>
            <input
              type="file"
              id="file-upload"
              style={{ display: "contents" }}
              onChange={(e) => {setFile(e.target.files[0]);
              setFileName(e.target.files[0].name)}}
            />
            {/* <div className="item">
              <AddLocationAltIcon/>
              <span>Место</span>
            </div>
            <div className="item">
              <PersonPinCircleIcon />
              <span>Друзья</span>
            </div> */}
          </div>
          <div className="right">
            <button onClick={handleClick}>Поделиться</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;