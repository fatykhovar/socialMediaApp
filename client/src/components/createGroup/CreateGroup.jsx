import { makeRequest } from "../../axios";
import "./createGroup.css";
import { useMutation, useQueryClient } from "react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React  from 'react'; 

const CreateGroup = ({setCreateGroup}) => {

	const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    name: "",
    description: "",
    // city: user.city,
    // website: user.website,
  });
  const { currentUser } = useContext(AuthContext);

  const upload = async (file) => {
    //console.log(file);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newGroup) => {
      return makeRequest.post("/groups", newGroup);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["groups"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();

    //TODO: find a better way to get image URL

    let coverUrl;
    let profileUrl;
    coverUrl = await upload(cover);
    profileUrl = await upload(profile);

    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setCreateGroup(false);
    setCover(null);
    setProfile(null);
  };

  return(
		<div className="createGroup">
      <div className="wrapper">
        <h1>Создание сообщества</h1>
        <div className="scroller">
          <form>
            <div className="files">
              <label htmlFor="cover">
                <span>Обложка</span>
                <div className="imgContainer">
                  <img
                    src={
                      cover
                        ? URL.createObjectURL(cover)
                        : {}
                    }
                    alt=""
                  />
                  <CloudUploadIcon className="icon" />
                </div>
              </label>
              <input
                type="file"
                id="cover"
                style={{ display: "none" }}
                onChange={(e) => setCover(e.target.files[0])}
              />
              <label htmlFor="profile">
                <span>Фото профиля</span>
                <div className="imgContainer">
                  <img
                    src={
                      profile
                        ? URL.createObjectURL(profile)
                        : {}
                    }
                    alt=""
                  />
                  <CloudUploadIcon className="icon" />
                </div>
              </label>
              <input
                type="file"
                id="profile"
                style={{ display: "none" }}
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </div>
            <label>Название</label>
            <input
              type="text"
              value={texts.email}
              name="name"
              onChange={handleChange}
            />
            <label>Описание</label>
            <input
              type="text"
              value={texts.password}
              name="description"
              onChange={handleChange}
            />
            <button onClick={handleClick}>Создать</button>
          </form>
        </div>
        <button className="close" onClick={() => setCreateGroup(false)}>
          Закрыть
        </button>
      </div>
    </div>
	);
};

export default CreateGroup;